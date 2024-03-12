import "@/assets/global.css";
import "./style.css";
import logo from "/icon/128.png";
import chevron from "/chevron-left.svg";
import fs from "fs";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div>
        <img src="${chevron}" class="logo" alt="Chevron left logo" />
        <img src="${logo}" class="logo" alt="Glossary logo" />
    </div>
    <form id="addWordForm">
        <h2>Add words</h2>
        <label for="acronym">Acronym : </label>
        <input type="text" id="acronym" required\>
        <label for="definition">Definition : </label>
        <input type="text" id="definition" required\>
        <button type="submit">Save</button>
    </form>
  </div>`;

document
  .querySelector("#addWordForm")!
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const acronym = (document.getElementById("acronym") as HTMLInputElement)
      .value;
    const definition = (
      document.getElementById("definition") as HTMLInputElement
    ).value;

    addToGlossary(acronym, definition);
  });

function addToGlossary(acronym: string, definition: string) {
  // Charger le contenu actuel du glossaire
  fs.readFile("public/glossary.json", "utf8", (err: any, data: any) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier glossary.json:", err);
      return;
    }

    // Analyser le contenu JSON
    const glossary = JSON.parse(data);

    // Vérifier si le sigle existe déjà
    if (!glossary[acronym]) {
      // Ajouter le nouveau sigle au glossaire
      glossary[acronym] = definition;

      // Écrire le contenu mis à jour dans le fichier glossary.json
      fs.writeFile(
        "public/glossary.json",
        JSON.stringify(glossary, null, 2),
        (err: any) => {
          if (err) {
            console.error(
              "Erreur lors de l'écriture dans le fichier glossary.json:",
              err
            );
            return;
          }
          console.log(`Le sigle ${acronym} a été ajouté avec succès.`);
        }
      );
    } else {
      console.log(`Le sigle ${acronym} existe déjà dans le glossaire.`);
    }
  });
}
