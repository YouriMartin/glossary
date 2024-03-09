import "@/assets/global.css";
import "./style.css";
import logo from "/icon/128.png";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <img src="${logo}" class="logo" alt="WXT logo" />
    <h1>Glossary Extension</h1>
    <div class="button-group">
    <a href="/popup-add-words.html" class="button">Add Words</a>
    <a id="show-words" class="button">Show Words</a>
    </div>
    <a class="read-the-docs" href="https://github.com/YouriMartin/glossary">Github</a>
  </div>
`;
