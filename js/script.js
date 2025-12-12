/* =========================================================
   FUNCIONES PRINCIPALES
   ========================================================= */

/* ----------------------------------------------
   1) Menú responsive (burger + nav)
   ---------------------------------------------- */
   function initMenu() {
    var $burger = $(".burger");   // jQuery: selecciona el botón del menú
    var $nav    = $("#main-nav"); // jQuery: nav principal
    var $body   = $("body");

    // Si no hay burger en esa página, no hacemos nada
    if ($burger.length === 0) return;

    $burger.on("click", function () {   // jQuery: .on("click", ...)
        // Leemos el aria-expanded actual (true/false en texto)
        var expanded = $(this).attr("aria-expanded") === "true";

        // Actualizamos aria-expanded (accesibilidad)
        $(this).attr("aria-expanded", (!expanded).toString());

        // Abrimos/cerramos el menú añadiendo/quitando una clase
        $nav.toggleClass("is-open");

        // Bloqueamos el scroll del body cuando el menú está abierto
        $body.toggleClass("no-scroll");
    });
}


/* ----------------------------------------------
   2) Cambio de tema (claro / oscuro)
   ---------------------------------------------- */
function initTheme() {
    var $toggle = $(".theme-toggle"); // botón del sol/luna
    var $body   = $("body");

    if ($toggle.length === 0) return;

    $toggle.on("click", function () {
        // Alternamos la clase que controla el tema en el CSS
        $body.toggleClass("theme-dark");

        // Cambiamos el aria-label para accesibilidad
        var isDark = $body.hasClass("theme-dark");
        $toggle.attr(
            "aria-label",
            isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
        );


/* ----------------------------------------------
   3) Filtros de visitas (Visitas.html)
   ---------------------------------------------- */
   function initVisitsSections() {
    var $tabs = $(".visits-filter");
    var $sections = $(".visits-section");
  
    if ($tabs.length === 0 || $sections.length === 0) return;
  
    $tabs.on("click", function () {
      var target = $(this).data("section");
  
      $tabs.removeClass("is-active");
      $(this).addClass("is-active");
  
      $sections.removeClass("is-active");
      $sections.filter('[data-section="' + target + '"]').addClass("is-active");
    });
  }
  
  function initDeckNavigation() {
    $(".visits-section").each(function () {
      var $section = $(this);
      var deckKey = $section.data("section");
      var $deck = $section.find('.visit-deck[data-deck="' + deckKey + '"]');
      var $cards = $deck.find(".visit-cardx");
  
      if ($deck.length === 0 || $cards.length === 0) return;
  
      var idx = 0;
      var total = $cards.length;
  
      $section.find(".total").text(total);
      $section.find(".current").text(idx + 1);
  
      function showCard(i) {
        idx = (i + total) % total;
        $cards.removeClass("is-active");
        $cards.eq(idx).addClass("is-active");
        $section.find(".current").text(idx + 1);
      }
  
      // botones de la sección
      $section.find(".nav-prev").on("click", function () { showCard(idx - 1); });
      $section.find(".nav-next").on("click", function () { showCard(idx + 1); });
    });
  }
  
  function initClassCarousels() {
    $("[data-carousel]").each(function () {
      var $car = $(this);
      var $track = $car.find(".car-track");
      var $slides = $track.find("img");
      var total = $slides.length;
      var idx = 0;
  
      function go(i) {
        idx = (i + total) % total;
        $track.css("transform", "translateX(" + (-idx * 100) + "%)");
      }
  
      $car.find(".car-prev").on("click", function () { go(idx - 1); });
      $car.find(".car-next").on("click", function () { go(idx + 1); });
  
      go(0);
    });
  }
  
  /* Llamadas */
  $(document).ready(function () {
    initMenu();
    initTheme();
  
    initVisitsSections();   // tabs Arte/Paseos/Gastro
    initDeckNavigation();   // 1 card a la vez
    initClassCarousels();   // carrusel simple
  });
  

    // botones de la sección
    $section.find(".nav-prev").on("click", function () { showCard(idx - 1); });
    $section.find(".nav-next").on("click", function () { showCard(idx + 1); });
  });
}

function initClassCarousels() {
  $("[data-carousel]").each(function () {
    var $car = $(this);
    var $track = $car.find(".car-track");
    var $slides = $track.find("img");
    var total = $slides.length;
    var idx = 0;

    function go(i) {
      idx = (i + total) % total;
      $track.css("transform", "translateX(" + (-idx * 100) + "%)");
    }

    $car.find(".car-prev").on("click", function () { go(idx - 1); });
    $car.find(".car-next").on("click", function () { go(idx + 1); });

    go(0);
  });
}

/* Llamadas */
$(document).ready(function () {
  initMenu();
  initTheme();

  initVisitsSections();   // tabs Arte/Paseos/Gastro
  initDeckNavigation();   // 1 card a la vez
  initClassCarousels();   // carrusel simple
});



/* ----------------------------------------------
   4) Modal de detalles de visita (Visitas.html)
   ---------------------------------------------- */
function initVisitsModal() {
    var $modal   = $("#visit-modal");
    var $overlay = $modal.find(".visit-modal__overlay");
    var $close   = $modal.find(".visit-modal__close");
    var $title   = $modal.find(".visit-modal__title");
    var $text    = $modal.find(".visit-modal__text");
    var $body    = $("body");
    var $buttons = $(".visit-card__more"); // botón "Más detalles"

    if ($buttons.length === 0 || $modal.length === 0) return;

    // Pequeño "diccionario" con textos extra para el modal
    var visitData = {
        "prado": {
            title: "Museo del Prado",
            text: "Museo imprescindible si te interesa el arte clásico. Lo ideal es reservar varias horas y combinarlo con un paseo por el Retiro."
        },
        "palacio-real": {
            title: "Palacio Real",
            text: "Zona perfecta para pasear entre jardines y plazas, combinando el Palacio Real con la Catedral de la Almudena."
        },
        "retiro": {
            title: "Parque del Retiro",
            text: "Parque muy céntrico, con el Estanque Grande y el Palacio de Cristal como puntos más reconocibles."
        },
        "gran-via": {
            title: "Gran Vía",
            text: "Arteria principal de ocio y compras, con teatros, cines y edificios icónicos."
        },
        "plaza-mayor": {
            title: "Plaza Mayor",
            text: "Plaza histórica rodeada de soportales, muy cerca del Mercado de San Miguel y otras zonas del casco antiguo."
        },
        "debod": {
            title: "Templo de Debod",
            text: "Uno de los atardeceres más conocidos de Madrid, con vistas abiertas hacia la Casa de Campo."
        }
    };

    function openModal(id) {
        var data = visitData[id];

        if (data) {
            $title.text(data.title);
            $text.text(data.text);
        } else {
            $title.text("Visita");
            $text.text("Detalles adicionales de la visita seleccionada.");
        }

        $modal.addClass("is-visible");
        $body.addClass("no-scroll");
    }

    function closeModal() {
        $modal.removeClass("is-visible");
        $body.removeClass("no-scroll");
    }

    // Abrir modal
    $buttons.on("click", function () {
        var id = $(this).data("visit"); // ej. "prado"
        openModal(id);
    });

    // Cerrar modal por overlay, botón o tecla ESC
    $overlay.on("click", closeModal);
    $close.on("click", closeModal);

    $(document).on("keydown", function (e) {
        if (e.key === "Escape") {
            closeModal();
        }
    });
}


/* ----------------------------------------------
   5) Tabs de clima (Clima.html)
   ---------------------------------------------- */
function initClimateTabs() {
    var $tabs   = $(".climate-tab");
    var $panels = $(".climate-panel");

    if ($tabs.length === 0 || $panels.length === 0) return;

    $tabs.on("click", function () {
        var target = $(this).data("tab");  // "clima", "cuando", "maleta"

        // Actualizamos estado visual de los tabs
        $tabs.removeClass("is-active");
        $(this).addClass("is-active");

        // Mostramos el panel que tenga ese data-tab-target
        $panels.removeClass("is-active");
        $panels.filter('[data-tab-target="' + target + '"]').addClass("is-active");
    });
}


/* ----------------------------------------------
   6) Gráfico de clima con Chart.js (Clima.html)
   ---------------------------------------------- */
function initClimateChart() {
    // Comprobamos si existe el canvas y si Chart está cargado
    var $canvas = $("#climateChart");
    if ($canvas.length === 0 || typeof Chart === "undefined") {
        return;
    }

    var ctx = $canvas[0].getContext("2d");

    // Datos de temperaturas medias en ºC (aprox Madrid)
    var labelsMeses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
                       "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    var tempsC = [6, 8, 11, 13, 18, 23, 27, 27, 23, 17, 11, 7];

    // Conversión a ºF (por si el usuario cambia unidad)
    var tempsF = tempsC.map(function (c) {
        return (c * 9 / 5) + 32;
    });

    // === Igual que en el ejemplo de clase: datos + config + new Chart() ===
    // (aquí usamos una sola línea en lugar de barras/tarta/línea distintas) :contentReference[oaicite:1]{index=1}
    var datosClima = {
        labels: labelsMeses,
        datasets: [{
            label: "Temperatura media",
            backgroundColor: "#b0282b",
            borderColor: "#b0282b",
            data: tempsC,
            tension: 0.3,
            pointRadius: 0
        }]
    };

    var configClima = {
        type: "line",
        data: datosClima,
        options: {
            scales: {
                x: {
                    border: {
                        color: "black",
                        width: 1
                    }
                },
                y: {
                    min: 0,
                    max: 40,
                    title: {
                        display: true,
                        text: "Temperatura (ºC)"
                    },
                    border: {
                        color: "black",
                        width: 1
                    }
                }
            }
        }
    };

    // Creamos el gráfico igual que en el ejemplo de clase:
    // var grafico = $("#linea")[0].getContext("2d");
    // new Chart(grafico, config);
    var climateChart = new Chart(ctx, configClima);

    // Botones para cambiar entre ºC y ºF
    var $unitButtons = $(".climate-units__btn");

    $unitButtons.on("click", function () {
        var unit = $(this).data("unit"); // "c" o "f"

        $unitButtons.removeClass("is-active");
        $(this).addClass("is-active");

        if (unit === "c") {
            climateChart.data.datasets[0].data = tempsC;
            climateChart.options.scales.y.title.text = "Temperatura (ºC)";
        } else {
            climateChart.data.datasets[0].data = tempsF;
            climateChart.options.scales.y.title.text = "Temperatura (ºF)";
        }

        climateChart.update();
    });
}


/* ----------------------------------------------
   7) Cuando el DOM está listo, inicializamos todo
   ---------------------------------------------- */
$(document).ready(function () {
    initMenu();
    initTheme();
    initVisitsFilters();
    initVisitsModal();
    initClimateTabs();
    initClimateChart();
    initLockedCarousels();
});
function initLockedCarousels() {
    var $carousels = $(".locked-carousel");
    if ($carousels.length === 0) return;
  
    function setSlide($c, idx) {
      var steps = parseInt($c.attr("data-steps") || "3", 10);
      idx = Math.max(0, Math.min(steps - 1, idx));
  
      $c.data("idx", idx);
  
      var $track = $c.find(".locked-track");
      $track.css("transform", "translateX(" + (-idx * 100) + "%)");
  
      $c.find(".locked-progress").text((idx + 1) + " / " + steps);
  
      // marcar completado al llegar al último
      if (idx === steps - 1) {
        $c.data("done", true);
      }
    }
  
    function isInViewport($el) {
      var r = $el[0].getBoundingClientRect();
      return r.top < window.innerHeight * 0.45 && r.bottom > window.innerHeight * 0.55;
    }
  
    // init
    $carousels.each(function () {
      var $c = $(this);
      $c.data("idx", 0);
      $c.data("done", false);
      setSlide($c, 0);
    });
  
    // botones
    $(document).on("click", ".locked-next", function () {
      var $c = $(this).closest(".locked-carousel");
      setSlide($c, ($c.data("idx") || 0) + 1);
    });
  
    $(document).on("click", ".locked-prev", function () {
      var $c = $(this).closest(".locked-carousel");
      setSlide($c, ($c.data("idx") || 0) - 1);
      $c.data("done", false); // si vuelves atrás, se “descompleta”
    });
  
    // BLOQUEO de rueda/trackpad mientras el carrusel no esté completado
    window.addEventListener("wheel", function (e) {
      // busca el carrusel "activo" (centrado)
      var active = null;
      $carousels.each(function () {
        var $c = $(this);
        if (!$c.data("done") && isInViewport($c)) active = $c;
      });
  
      if (!active) return;
  
      // bloquea scroll de página
      e.preventDefault();
  
      var delta = e.deltaY;
      var idx = active.data("idx") || 0;
      var steps = parseInt(active.attr("data-steps") || "3", 10);
  
      if (delta > 0 && idx < steps - 1) {
        setSlide(active, idx + 1);
      } else if (delta < 0 && idx > 0) {
        setSlide(active, idx - 1);
        active.data("done", false);
      }
      // si ya está en el último, no bloquea más (porque active.data("done") será true)
    }, { passive: false });
  }
  