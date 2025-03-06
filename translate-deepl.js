/* eslint-disable @typescript-eslint/no-require-imports */
const deepl = require("deepl-node");
const fs = require("fs-extra");

// Chemin vers ton fichier JSON
const targetLanguage = "en-US"; // DeepL utilise des codes de langue en majuscules (ex: "EN", "FR")
const inputFilePath = "./messages/fr.json";
const outputFilePath = `./messages/msg.${targetLanguage}.json`;
const cacheFilePath = "./messages/translation-cache.json"; // Fichier de cache

// Configurer DeepL avec ta clé API
const translator = new deepl.Translator(String(process.env.DEEPL_API_KEY)); // Remplace par ta clé API DeepL

// Charger le cache depuis le fichier (s'il existe)
let cache = {};
if (fs.existsSync(cacheFilePath)) {
  cache = fs.readJsonSync(cacheFilePath);
}

// Délai entre les requêtes (en millisecondes)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fonction pour traduire un texte tout en préservant les placeholders
const translateText = async (text) => {
  if (cache[text]) {
    console.log("Traduction en cache :", text);
    return cache[text];
  }

  console.log("Texte original :", text);

  // Détecter les placeholders (ex: {username}, {count}, etc.)
  const placeholders = text.match(/\{[^}]+\}/g) || [];
  console.log("Placeholders détectés :", placeholders);

  // Remplacer les placeholders par des marqueurs temporaires
  let tempText = text;
  placeholders.forEach((placeholder, index) => {
    tempText = tempText.replace(placeholder, `__PLACEHOLDER_${index}__`);
  });
  console.log("Texte temporaire (placeholders remplacés) :", tempText);

  // Traduire le texte sans les placeholders
  const translated = await translator.translateText(
    tempText,
    null,
    targetLanguage,
  );
  console.log("Texte traduit :", translated.text);

  // Remplacer les marqueurs temporaires par les placeholders d'origine
  let finalText = translated.text;
  placeholders.forEach((placeholder, index) => {
    const regex = new RegExp(`__PLACEHOLDER_${index}__`, "gi"); // "gi" = insensible à la casse
    finalText = finalText.replace(regex, placeholder);
  });
  console.log("Texte final (placeholders restaurés) :", finalText);

  // Ajouter la traduction au cache
  cache[text] = finalText;

  // Sauvegarder le cache dans un fichier
  fs.writeJsonSync(cacheFilePath, cache, { spaces: 2 });

  // Délai entre les requêtes
  await delay(1000);

  return finalText;
};

// Fonction pour traduire récursivement un objet JSON
const translateJson = async (source, target) => {
  for (const key in source) {
    if (typeof source[key] === "string") {
      // Si la clé existe déjà dans la cible, on ne la traduit pas
      if (target[key]) {
        console.log(`La clé "${key}" est déjà traduite.`);
        continue;
      }

      // Traduire les valeurs de type string
      target[key] = await translateText(source[key]);
    } else if (typeof source[key] === "object" && source[key] !== null) {
      // Si la clé n'existe pas dans la cible, on crée un nouvel objet
      if (!target[key]) {
        target[key] = {};
      }

      // Traduire récursivement les sous-objets
      await translateJson(source[key], target[key]);
    }
  }
  return target;
};

// Fonction principale
const main = async () => {
  try {
    // Lire les fichiers de traduction
    const sourceTranslations = await fs.readJson(inputFilePath);
    let targetTranslations = {};

    // Si le fichier de destination existe, on le charge
    if (fs.existsSync(outputFilePath)) {
      targetTranslations = await fs.readJson(outputFilePath);
    }

    // Traduire le JSON
    const translatedJson = await translateJson(
      sourceTranslations,
      targetTranslations,
    );

    // Sauvegarder le fichier traduit
    await fs.writeJson(outputFilePath, translatedJson, { spaces: 2 });
    console.log("Traduction terminée ! Fichier sauvegardé :", outputFilePath);
  } catch (error) {
    console.error("Erreur lors de la traduction :", error);
  }
};

// Lancer le script
main();
