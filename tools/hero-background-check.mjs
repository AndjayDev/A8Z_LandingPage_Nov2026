// 5.11/5.12: no particle or star pattern on the page (BO, 18 Nov 2026): the hero background layer is "none" and the video frame has no star layer.
import chromium from "@sparticuz/chromium"; import puppeteer from "puppeteer-core";
const b=await puppeteer.launch({executablePath:await chromium.executablePath(),args:chromium.args,headless:true});
const p=await b.newPage(); await p.goto("file://"+process.argv[2]); await new Promise(r=>setTimeout(r,800));
const bg=await p.evaluate(()=>getComputedStyle(document.querySelector(".hero"),"::before").backgroundImage.slice(0,40));
const stars=await p.evaluate(()=>document.querySelectorAll(".gvf-stars").length);
console.log((bg==="none"&&stars===0?"PASS":"FAIL")+" hero background layer: "+bg+" · star layers on the video frame: "+stars); await b.close();
