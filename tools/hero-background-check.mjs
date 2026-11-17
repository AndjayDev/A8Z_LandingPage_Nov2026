// 5.11: the hero carries no particle / star-field background (BO, 18 Nov 2026). PASS when the hero background layer is "none".
import chromium from "@sparticuz/chromium"; import puppeteer from "puppeteer-core";
const b=await puppeteer.launch({executablePath:await chromium.executablePath(),args:chromium.args,headless:true});
const p=await b.newPage(); await p.goto("file://"+process.argv[2]); await new Promise(r=>setTimeout(r,800));
const bg=await p.evaluate(()=>getComputedStyle(document.querySelector(".hero"),"::before").backgroundImage.slice(0,40));
console.log((bg==="none"?"PASS":"FAIL")+" hero background layer: "+bg); await b.close();
