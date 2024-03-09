import "./style.css";
import logo from "/icon/128.png";
import { setupCounter } from "@/components/counter";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <img src="${logo}" class="logo" alt="WXT logo" />
    <h1>Glossary Extension</h1>
    <p class="read-the-docs">Glossary Extension</p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
