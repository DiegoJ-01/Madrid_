/* =========================================================
   Helpers
   ========================================================= */
   function qs(sel, root = document){ return root.querySelector(sel); }
   function qsa(sel, root = document){ return Array.from(root.querySelectorAll(sel)); }
   
   /* =========================================================
      Menu (mobile)
      ========================================================= */
   (function initMenu(){
     const burger = qs(".burger");
     const nav = qs(".main-nav");
     const body = document.body;
   
     if (!burger || !nav) return;
   
     function setOpen(open){
       nav.classList.toggle("is-open", open);
       burger.setAttribute("aria-expanded", String(open));
       body.classList.toggle("no-scroll", open);
     }
   
     burger.addEventListener("click", () => {
       setOpen(!nav.classList.contains("is-open"));
     });
   
     nav.addEventListener("click", (e) => {
       const a = e.target.closest("a");
       if (a && nav.classList.contains("is-open")) setOpen(false);
     });
   
     window.addEventListener("keydown", (e) => {
       if (e.key === "Escape") setOpen(false);
     });
   })();
   
   /* =========================================================
      Theme toggle (localStorage)
      ========================================================= */
   (function initTheme(){
     const body = document.body;
     const btn = qs(".theme-toggle");
     const KEY = "theme";
   
     function apply(theme){
       const dark = theme === "dark";
       body.classList.toggle("theme-dark", dark);
       body.classList.toggle("theme-light", !dark);
       try{ localStorage.setItem(KEY, theme); } catch {}
     }
   
     try{
       const saved = localStorage.getItem(KEY);
       if (saved === "dark") apply("dark");
     } catch {}
   
     if (!btn) return;
   
     btn.addEventListener("click", () => {
       const isDark = body.classList.contains("theme-dark");
       apply(isDark ? "light" : "dark");
     });
   })();
   
   /* =========================================================
      Category switch (como un modo: solo 1 visible)
      - body.cat-arte / body.cat-paseos / body.cat-gastro
      ========================================================= */
   (function initCategorySwitch(){
     const body = document.body;
     const tabs = qsa(".cat-tab");
     const prev = qs(".cat-prev");
     const next = qs(".cat-next");
     const catIndex = qs("#catIndex");
     const catTotal = qs("#catTotal");
   
     const order = ["arte","paseos","gastro"];
     if (catTotal) catTotal.textContent = String(order.length);
   
     function getActive(){
       return order.find(c => body.classList.contains("cat-" + c)) || "arte";
     }
   
     function setActive(cat){
       // body classes
       order.forEach(c => body.classList.remove("cat-" + c));
       body.classList.add("cat-" + cat);
   
       // tabs
       tabs.forEach(btn => {
         const is = btn.dataset.cat === cat;
         btn.classList.toggle("is-active", is);
         btn.setAttribute("aria-selected", String(is));
       });
   
       // counter
       const idx = order.indexOf(cat);
       if (catIndex) catIndex.textContent = String(idx + 1);
   
       // al cambiar de categoría, resetea sliders/carruseles visibles a su 1ª imagen
       resetVisibleCarousels();
       resetVisibleStory();
     }
   
     function resetVisibleCarousels(){
       // solo los carruseles dentro de la categoría visible
       const active = getActive();
       const section = qs("#" + active);
       if (!section) return;
   
       qsa("[data-carousel]", section).forEach(car => {
         const slides = qsa(".slide", car);
         slides.forEach((s,i) => s.classList.toggle("is-active", i === 0));
         const cur = qs(".car-cur", car);
         const tot = qs(".car-tot", car);
         if (cur) cur.textContent = slides.length ? "1" : "0";
         if (tot) tot.textContent = String(slides.length);
         car.dataset.index = "0";
       });
     }
   
     function resetVisibleStory(){
       const active = getActive();
       const section = qs("#" + active);
       if (!section) return;
   
       const story = qs("[data-story]", section);
       if (!story) return;
   
       const slides = qsa(".story__slide", story);
       const dots = qsa(".dot", story);
       slides.forEach((s,i) => s.classList.toggle("is-active", i === 0));
       dots.forEach((d,i) => d.classList.toggle("is-active", i === 0));
       story.dataset.index = "0";
     }
   
     // tab clicks
     tabs.forEach(btn => {
       btn.addEventListener("click", () => setActive(btn.dataset.cat));
     });
   
     // arrows
     if (prev) prev.addEventListener("click", () => {
       const cur = getActive();
       const i = order.indexOf(cur);
       const nextCat = order[(i - 1 + order.length) % order.length];
       setActive(nextCat);
     });
   
     if (next) next.addEventListener("click", () => {
       const cur = getActive();
       const i = order.indexOf(cur);
       const nextCat = order[(i + 1) % order.length];
       setActive(nextCat);
     });
   
     // init (por si el body trae otra)
     setActive(getActive());
   })();
   
   /* =========================================================
      Carousels (Version A)
      - Sin scroll vertical. Fade simple.
      ========================================================= */
   (function initCarousels(){
     qsa("[data-carousel]").forEach(car => {
       const slides = qsa(".slide", car);
       const btnPrev = qs(".car-btn--prev", car);
       const btnNext = qs(".car-btn--next", car);
       const curEl = qs(".car-cur", car);
       const totEl = qs(".car-tot", car);
   
       if (totEl) totEl.textContent = String(slides.length);
       if (curEl) curEl.textContent = slides.length ? "1" : "0";
       car.dataset.index = car.dataset.index || "0";
   
       function render(idx){
         if (!slides.length) return;
         const n = slides.length;
         const i = (idx + n) % n;
         slides.forEach((s,k) => s.classList.toggle("is-active", k === i));
         if (curEl) curEl.textContent = String(i + 1);
         car.dataset.index = String(i);
       }
   
       function prev(){
         const idx = parseInt(car.dataset.index || "0", 10);
         render(idx - 1);
       }
       function next(){
         const idx = parseInt(car.dataset.index || "0", 10);
         render(idx + 1);
       }
   
       btnPrev && btnPrev.addEventListener("click", prev);
       btnNext && btnNext.addEventListener("click", next);
   
       // teclado: flechas si haces click / foco
       car.setAttribute("tabindex", "0");
       car.addEventListener("keydown", (e) => {
         if (e.key === "ArrowLeft") prev();
         if (e.key === "ArrowRight") next();
       });
   
       // arreglo rápido: si alguna URL no carga, quítala y reajusta contador
       slides.forEach(img => {
         img.addEventListener("error", () => {
           img.remove();
           const remaining = qsa(".slide", car);
           if (totEl) totEl.textContent = String(remaining.length);
           if (!remaining.length && curEl) curEl.textContent = "0";
           car.dataset.index = "0";
         });
       });
     });
   })();
   
   /* =========================================================
      Story slider (Version B)
      - 1 slide visible, fade/scale.
      ========================================================= */
   (function initStory(){
     qsa("[data-story]").forEach(story => {
       const slides = qsa(".story__slide", story);
       const btnPrev = qs(".story__btn--prev", story);
       const btnNext = qs(".story__btn--next", story);
       const dots = qsa(".dot", story);
   
       if (!slides.length) return;
   
       story.dataset.index = story.dataset.index || "0";
   
       function render(idx){
         const n = slides.length;
         const i = (idx + n) % n;
         slides.forEach((s,k) => s.classList.toggle("is-active", k === i));
         dots.forEach((d,k) => d.classList.toggle("is-active", k === i));
         story.dataset.index = String(i);
       }
   
       function prev(){
         const idx = parseInt(story.dataset.index || "0", 10);
         render(idx - 1);
       }
   
       function next(){
         const idx = parseInt(story.dataset.index || "0", 10);
         render(idx + 1);
       }
   
       btnPrev && btnPrev.addEventListener("click", prev);
       btnNext && btnNext.addEventListener("click", next);
   
       dots.forEach((d, i) => {
         d.addEventListener("click", () => render(i));
       });
   
       // teclado
       story.setAttribute("tabindex", "0");
       story.addEventListener("keydown", (e) => {
         if (e.key === "ArrowLeft") prev();
         if (e.key === "ArrowRight") next();
       });
   
       // init
       render(parseInt(story.dataset.index, 10) || 0);
     });
   })();
   