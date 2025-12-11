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
    });
}


/* ----------------------------------------------
   3) Filtros de visitas (Visitas.html)
   ---------------------------------------------- */
function initVisitsFilters() {
    var $filters = $(".visits-filter"); // botones de filtro
    var $cards   = $(".visit-card");    // tarjetas con data-category

    if ($filters.length === 0 || $cards.length === 0) return;

    $filters.on("click", function () {
        var filter = $(this).data("filter"); // "all", "arte", "parque", etc.

        // Visualmente marcamos qué botón está activo
        $filters.removeClass("is-active");
        $(this).addClass("is-active");

        if (filter === "all") {
            // Mostrar todas las cards
            $cards.fadeIn(200);
        } else {
            // Mostrar solo las que coinciden con el data-category
            $cards.each(function () {
                var category = $(this).data("category");
                if (category === filter) {
                    $(this).fadeIn(200);
                } else {
                    $(this).fadeOut(200);
                }
            });
        }
    });
}


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
});
