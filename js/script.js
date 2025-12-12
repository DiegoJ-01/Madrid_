/* =========================================================
   MENÚ RESPONSIVE
   ========================================================= */
   function initMenu() {
    const $burger = $(".burger");
    const $nav = $(".main-nav");
  
    if ($burger.length === 0 || $nav.length === 0) return;
  
    $burger.on("click", function () {
      $nav.toggleClass("is-open");
      $("body").toggleClass("no-scroll");
    });
  }
  
  /* =========================================================
     TOGGLE TEMA CLARO / OSCURO
     ========================================================= */
  function initTheme() {
    const $toggle = $(".theme-toggle");
    if ($toggle.length === 0) return;
  
    $toggle.on("click", function () {
      $("body").toggleClass("theme-dark");
    });
  }
  
  /* =========================================================
     GALERÍAS DE IMÁGENES (URLs CENTRALIZADAS)
     ========================================================= */
  const GALLERIES = {
    "capitol": [
      "https://images.adsttc.com/media/images/57da/bee0/e58e/ce37/9500/0034/slideshow/Felipe_Gabald%C3%B3n_Flickr.jpg?1473953482",
      "https://images.adsttc.com/media/images/57da/c359/e58e/ce37/9500/0038/slideshow/capitol.jpg?1473954639",
      "https://i.pinimg.com/1200x/dd/ad/21/ddad219bd31de834565a2c72e7663953.jpg"
    ],
  
    "retiro": [
      "https://i.pinimg.com/1200x/06/d0/20/06d0206fd32fb06206bc049c68a1c314.jpg",
      "https://i.pinimg.com/1200x/1a/98/57/1a98571dc208fcf824491731e72116d4.jpg",
      "https://i.pinimg.com/736x/84/03/b2/8403b259b5ffa8a7e8a9c68a25612f60.jpg"
    ],
  
    "prado": [
      "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvMy1kZS1tYXlvLWdveWEuanBnIiwicmVzaXplLDE1MDB8Zm9ybWF0LHdlYnAiXX0.t83BNU1x8wHKolw0u6FS-OZqTth3m4zdlA1--27xEDE.webp",
      "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvNWY1MGM1MjhhZDM1Mi5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.osXPvzB5gvHSQwWX4BZcLGR-6Phf14s8YkqQYngDocY.webp",
      "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvNjNhZWUwMTQzNWYzOC5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.bjR2KR2adxFRqS0skrcRILn9ruzIkI72lyhESC4sD8s.webp"
    ],
  
    "reina-sofia": [
      "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvcGFibG8tcGljYXNzby1ndWVybmljYS5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.tvCZ-woMXn0xZf2uCJMiKk6r1o_-iIvJhkyaFMufiTA.webp",
      "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvYXMwMTk4NV83LmpwZyIsInJlc2l6ZSwxNTAwfGZvcm1hdCx3ZWJwIl19.tWNt61-YqcXUIkjsgDDiPXaXoxxYxpKUE0HTO-EfRH4.webp",
      "https://recursos.museoreinasofia.es/styles/large_portrait/public/Obra/AD06620_2.jpg.webp"
    ],
  
    "thyssen": [
      "https://upload.wikimedia.org/wikipedia/commons/9/95/Edgar_Degas_-_Balan%C3%A7ant_danseurs.jpg",
      "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvNjIyMzM3MDI3MThlMS5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.Hl2FMrV9vFko-1sjVAzRkv5sBKHfvW6Rt_1aqxfHav0.webp",
      "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvNjAxMTYwYmIwZTY5Mi5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.0uc9FRx7wGSBNWZJZHCuEcp1sdGA6BovOmez8fSiNRM.webp"
    ],
  
    "san-miguel": [
      "https://i.pinimg.com/1200x/b0/d1/1f/b0d11f864afc8d20e41e0866dc485c66.jpg"
    ],
  
    "la-latina": [
      "https://i.pinimg.com/736x/25/d8/9b/25d89be892fbd95c5766b273dd110c85.jpg"
    ]
  };
  
  /* =========================================================
     INYECTAR IMÁGENES EN CARRUSELES
     - Busca: [data-carousel][data-gallery]
     - Mete <img> dentro de .car-track
     ========================================================= */
  function initGalleryInjection() {
    $("[data-carousel][data-gallery]").each(function () {
      const $carousel = $(this);
      const key = String($carousel.data("gallery") || "").trim();
      const images = GALLERIES[key];
  
      if (!images || images.length === 0) return;
  
      const $track = $carousel.find(".car-track");
      if ($track.length === 0) return;
  
      $track.empty();
  
      images.forEach(function (url, i) {
        const cleanUrl = String(url).trim().replace(/^vhttps:\/\//, "https://"); // por si se coló "vhttps"
        const $img = $("<img>", {
          src: cleanUrl,
          alt: key + " " + (i + 1),
          loading: "lazy"
        });
  
        // Si una URL da error, la quitamos sin romper el carrusel
        $img.on("error", function () {
          $(this).remove();
        });
  
        $track.append($img);
      });
  
      // Set total en contador si existe
      const total = $track.find("img").length;
      const $totalEl = $carousel.find(".car-total");
      if ($totalEl.length) $totalEl.text(total);
      const $curEl = $carousel.find(".car-current");
      if ($curEl.length) $curEl.text(total > 0 ? 1 : 0);
    });
  }
  
  /* =========================================================
     CARRUSEL "EDITORIAL" (VERTICAL)
     - Sin API: scroll vertical + scroll-snap (CSS)
     - Botones prev/next = scroll al siguiente bloque
     - Contador se actualiza según scroll
     ========================================================= */
  function initEditorialCarousels() {
    $("[data-carousel]").each(function () {
      const $carousel = $(this);
      const $viewport = $carousel.find(".car-viewport");
      const $track = $carousel.find(".car-track");
      const $imgs = $track.find("img");
  
      if ($viewport.length === 0 || $track.length === 0) return;
  
      let total = $imgs.length;
      if (total === 0) return;
  
      const $curEl = $carousel.find(".car-current");
      const $totalEl = $carousel.find(".car-total");
      if ($totalEl.length) $totalEl.text(total);
      if ($curEl.length) $curEl.text(1);
  
      function getCurrentIndex() {
        // Calcula el índice mirando qué imagen está más cerca del top del viewport
        const vp = $viewport[0];
        const vpRect = vp.getBoundingClientRect();
        let bestIdx = 0;
        let bestDist = Infinity;
  
        $track.find("img").each(function (i) {
          const r = this.getBoundingClientRect();
          const dist = Math.abs(r.top - vpRect.top);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }
        });
  
        return bestIdx;
      }
  
      function scrollToIndex(idx) {
        const $all = $track.find("img");
        const clamped = Math.max(0, Math.min(idx, $all.length - 1));
        const el = $all.get(clamped);
        if (!el) return;
  
        // Scroll suave al elemento dentro del viewport
        el.scrollIntoView({ behavior: "smooth", block: "start" });
  
        // Actualiza contador (optimista)
        if ($curEl.length) $curEl.text(clamped + 1);
      }
  
      // Botones
      $carousel.find(".car-prev").off("click").on("click", function () {
        const idx = getCurrentIndex();
        scrollToIndex(idx - 1);
      });
  
      $carousel.find(".car-next").off("click").on("click", function () {
        const idx = getCurrentIndex();
        scrollToIndex(idx + 1);
      });
  
      // Actualiza contador al hacer scroll (con debounce)
      let scrollTimer = null;
      $viewport.off("scroll").on("scroll", function () {
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
          const idx = getCurrentIndex();
          if ($curEl.length) $curEl.text(idx + 1);
        }, 120);
      });
  
      // Por si cambia el DOM (lazy load / errores)
      $(window).on("load", function () {
        const idx = getCurrentIndex();
        if ($curEl.length) $curEl.text(idx + 1);
        total = $track.find("img").length;
        if ($totalEl.length) $totalEl.text(total);
      });
    });
  }
  
  /* =========================================================
     VISITAS · CAMBIO DE SECCIONES (ARTE / PASEOS / GASTRO)
     - No API: es mostrar/ocultar secciones en el HTML
     ========================================================= */
  function initVisitsSections() {
    const $tabs = $(".visits-filter");
    const $sections = $(".visits-section");
  
    if ($tabs.length === 0 || $sections.length === 0) return;
  
    $tabs.off("click").on("click", function () {
      const target = String($(this).data("section") || "").trim();
      if (!target) return;
  
      $tabs.removeClass("is-active");
      $(this).addClass("is-active");
  
      $sections.removeClass("is-active");
      $sections.filter('[data-section="' + target + '"]').addClass("is-active");
  
      // Cuando cambio de sección, vuelvo a la primera card de esa sección
      const $deck = $sections
        .filter('[data-section="' + target + '"]')
        .find('.visit-deck[data-deck="' + target + '"]');
  
      const $cards = $deck.find(".visit-cardx");
      if ($cards.length) {
        $cards.removeClass("is-active");
        $cards.eq(0).addClass("is-active");
        $sections.filter('[data-section="' + target + '"]').find(".current").text(1);
        $sections.filter('[data-section="' + target + '"]').find(".total").text($cards.length);
      }
  
      // Asegura que contadores de carrusel estén ok
      initEditorialCarousels();
    });
  }
  
  /* =========================================================
     VISITAS · UNA CARD A LA VEZ (DECK NAV)
     ========================================================= */
  function initDeckNavigation() {
    $(".visits-section").each(function () {
      const $section = $(this);
      const key = String($section.data("section") || "").trim();
  
      const $deck = $section.find('.visit-deck[data-deck="' + key + '"]');
      const $cards = $deck.find(".visit-cardx");
      if ($cards.length === 0) return;
  
      let index = 0;
      const total = $cards.length;
  
      $section.find(".total").text(total);
  
      function show(i) {
        index = (i + total) % total;
        $cards.removeClass("is-active");
        $cards.eq(index).addClass("is-active");
        $section.find(".current").text(index + 1);
  
        // Recalcula carruseles por si cambian tamaños al mostrarse
        initEditorialCarousels();
      }
  
      $section.find(".nav-prev").off("click").on("click", function () {
        show(index - 1);
      });
  
      $section.find(".nav-next").off("click").on("click", function () {
        show(index + 1);
      });
  
      show(0);
    });
  }
  
  /* =========================================================
     READY
     ========================================================= */
  $(document).ready(function () {
    initMenu();
    initTheme();
  
    initGalleryInjection();    // mete imágenes por URL
    initEditorialCarousels();  // carrusel editorial vertical + contador
  
    initVisitsSections();      // tabs
    initDeckNavigation();      // una card por sección
  });
  