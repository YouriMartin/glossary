import "@/assets/global.css";
import "./style.css";
import logo from "/icon/128.png";
import chevron from "/chevron-left.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div>
        <img src="${chevron}" class="logo" alt="Chevron left logo" />
        <img src="${logo}" class="logo" alt="Glossary logo" />
    </div>
    <form>
        <h2>Add words</h2>
        <label>Acronym : </label>
        <input type="text" required\>
        <label>Definition : </label>
        <input type="text" required\>
    </form>
  </div>`;
