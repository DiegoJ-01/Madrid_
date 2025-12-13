/* =========================================================
   Madrid Guide – JavaScript Premium
   - jQuery para animaciones suaves
   - Chart.js para visualización de clima
   - Parallax mejorado
   - Transiciones elegantes
   ========================================================= */

   (function($) {
    'use strict';
  
    /* =========================
       1) THEME TOGGLE
       ========================= */
    function initTheme() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      
      if (savedTheme === 'dark') {
        $('body').addClass('theme-dark');
      }
      
      $('.theme-toggle').on('click', function() {
        $('body').toggleClass('theme-dark');
        const newTheme = $('body').hasClass('theme-dark') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        
        // Actualizar Chart.js si existe
        if (window.climateChart) {
          updateChartTheme(newTheme);
        }
      });
    }
  
    /* =========================
       2) BURGER MENU
       ========================= */
    function initBurger() {
      $('.burger').on('click', function() {
        const $nav = $('.main-nav');
        const isOpen = $nav.toggleClass('is-open').hasClass('is-open');
        $(this).attr('aria-expanded', isOpen);
        
        // Animar líneas del burger
        if (isOpen) {
          $('.burger__line').eq(0).css('transform', 'rotate(45deg) translateY(7px)');
          $('.burger__line').eq(1).css('opacity', '0');
          $('.burger__line').eq(2).css('transform', 'rotate(-45deg) translateY(-7px)');
        } else {
          $('.burger__line').css({'transform': '', 'opacity': ''});
        }
      });
    }
  
    /* =========================
       3) SCROLL ANIMATIONS - jQuery fade-in
       ========================= */
    function initScrollAnimations() {
      // Función para detectar elementos en viewport
      function isInViewport($el) {
        const elementTop = $el.offset().top;
        const elementBottom = elementTop + $el.outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
      }
      
      // Añadir clase inicial
      $('.visit-split, .walk-block, .info-card').css({
        'opacity': '0',
        'transform': 'translateY(40px)',
        'transition': 'opacity 0.8s ease, transform 0.8s ease'
      });
      
      function checkScroll() {
        $('.visit-split, .walk-block, .info-card').each(function() {
          const $this = $(this);
          if (isInViewport($this) && $this.css('opacity') === '0') {
            $this.css({
              'opacity': '1',
              'transform': 'translateY(0)'
            });
          }
        });
      }
      
      $(window).on('scroll', checkScroll);
      checkScroll(); // Check inicial
    }
  
    /* =========================
       4) HEADER SCROLL EFFECT
       ========================= */
    function initHeaderScroll() {
      let lastScroll = 0;
      
      $(window).on('scroll', function() {
        const currentScroll = $(window).scrollTop();
        
        if (currentScroll > 100) {
          $('.site-header').css({
            'box-shadow': '0 2px 20px rgba(0,0,0,0.08)',
            'background': $('body').hasClass('theme-dark') 
              ? 'rgba(10, 10, 10, 0.98)' 
              : 'rgba(255, 255, 255, 0.98)'
          });
        } else {
          $('.site-header').css({
            'box-shadow': 'none',
            'background': $('body').hasClass('theme-dark')
              ? 'rgba(10, 10, 10, 0.95)'
              : 'rgba(255, 255, 255, 0.95)'
          });
        }
        
        lastScroll = currentScroll;
      });
    }
  
    /* =========================
       5) VISITAS: CATEGORIES
       ========================= */
    function initVisitasCategories() {
      if (!$('body').hasClass('page-visitas')) return;
  
      const order = ['arte', 'paseos', 'ocio'];
      let current = 'arte';
  
      function setCategory(cat, animate = true) {
        current = cat;
  
        // Actualizar tabs
        $('.vis-tab').each(function() {
          const isActive = $(this).data('category') === cat;
          $(this).toggleClass('is-active', isActive)
                 .attr('aria-selected', isActive);
        });
  
        // Fade out actual, fade in nuevo
        const $currentSection = $('.vis-category.is-active');
        const $nextSection = $(`.vis-category[data-category="${cat}"]`);
  
        if (animate) {
          $currentSection.fadeOut(300, function() {
            $(this).removeClass('is-active');
            $nextSection.fadeIn(400).addClass('is-active');
            
            // Scroll suave
            $('html, body').animate({
              scrollTop: $('.vis-category-nav').offset().top - 100
            }, 600);
          });
        } else {
          $('.vis-category').removeClass('is-active').hide();
          $nextSection.addClass('is-active').show();
        }
  
        // Actualizar contador
        const index = order.indexOf(cat);
        $('.js-cat-index').text(index + 1);
        $('.js-cat-total').text(order.length);
      }
  
      // Event listeners
      $('.vis-tab').on('click', function() {
        setCategory($(this).data('category'));
      });
  
      $('.js-cat-prev').on('click', function() {
        const currentIndex = order.indexOf(current);
        const prevIndex = (currentIndex - 1 + order.length) % order.length;
        setCategory(order[prevIndex]);
      });
  
      $('.js-cat-next').on('click', function() {
        const currentIndex = order.indexOf(current);
        const nextIndex = (currentIndex + 1) % order.length;
        setCategory(order[nextIndex]);
      });
  
      // Inicializar
      setCategory(current, false);
    }
  
    /* =========================
       6) VISITAS: CAROUSELS
       ========================= */
    function initCarousels() {
      if (!$('body').hasClass('page-visitas')) return;
  
      const IMAGES = {
        // ARTE
        prado: [
            "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvMy1kZS1tYXlvLWdveWEuanBnIiwicmVzaXplLDE1MDB8Zm9ybWF0LHdlYnAiXX0.t83BNU1x8wHKolw0u6FS-OZqTth3m4zdlA1--27xEDE.webp",
            "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvNWY1MGM1MjhhZDM1Mi5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.osXPvzB5gvHSQwWX4BZcLGR-6Phf14s8YkqQYngDocY.webp",
            "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvNjNhZWUwMTQzNWYzOC5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.bjR2KR2adxFRqS0skrcRILn9ruzIkI72lyhESC4sD8s.webp"
          ],
          reina: [
            "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvcGFibG8tcGljYXNzby1ndWVybmljYS5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.tvCZ-woMXn0xZf2uCJMiKk6r1o_-iIvJhkyaFMufiTA.webp",
            "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvYXMwMTk4NV83LmpwZyIsInJlc2l6ZSwxNTAwfGZvcm1hdCx3ZWJwIl19.tWNt61-YqcXUIkjsgDDiPXaXoxxYxpKUE0HTO-EfRH4.webp",
            "https://recursos.museoreinasofia.es/styles/large_portrait/public/Obra/AD06620_2.jpg.webp"
          ],
          thyssen: [
            "https://upload.wikimedia.org/wikipedia/commons/9/95/Edgar_Degas_-_Balan%C3%A7ant_danseurs.jpg",
            "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvNjIyMzM3MDI3MThlMS5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.Hl2FMrV9vFko-1sjVAzRkv5sBKHfvW6Rt_1aqxfHav0.webp",
            "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydHdvcmtcL2ltYWdlRmlsZVwvNjAxMTYwYmIwZTY5Mi5qcGciLCJyZXNpemUsMTUwMHxmb3JtYXQsd2VicCJdfQ.0uc9FRx7wGSBNWZJZHCuEcp1sdGA6BovOmez8fSiNRM.webp"
        ],
    
  
        // OCIO
        lamiak: [
          "https://scontent-mad2-1.xx.fbcdn.net/v/t39.30808-6/504186439_10162845913941726_592603239181682945_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=aBMj7jiCw7IQ7kNvwHW7PGW&_nc_oc=Adli1UH7XOkuVsaCuzWqNCHRtr6u7lI3vG_gvsNKUN_V8MBPfkAzWIi8uBdGheaP9XU&_nc_zt=23&_nc_ht=scontent-mad2-1.xx&_nc_gid=WlOAPP8VFujjsAqkV-NFIw&oh=00_AfngaVjpCJQu-_JRlc75Kz0LwX8DG1Io0Fd_oQ8M4SxGDQ&oe=6943813F",
          "https://production-data.worldofmouth.app/images/754f57dc-d59f-4d61-9bc3-1e8363eeec82.jpg"
        ],
        rosilaloca: [
          "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2025/08/20/17557076658072.jpg",
          "https://planesenmadrid.es/wp-content/uploads/2021/07/restaurante-rosi-la-loca.jpg"
        ],
        sanmiguel: [
          "https://images.unsplash.com/photo-1664695407561-72d0d171e44e?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1583992332991-8f9ce155a0de?w=1200&q=80https://www.miradormadrid.com/wp-content/uploads/2021/07/Mercado-de-San-Miguel-Comunicacion-2.jpg"
        ],
        latina: [
          "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2019/11/04043917/shutterstock_1548317732-1.jpg",
          "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2022/10/27170605/plaza-san-andres-la-latina.jpg"
        ],
        cba: [
          "https://arqa.com/wp-content/uploads/2014/05/239.jpg",
          "https://images.unsplash.com/photo-1644137676416-60e3001727aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ]
      };
  
      $('.carousel').each(function() {
        const $carousel = $(this);
        const carouselId = $carousel.data('carousel-id');
        const images = IMAGES[carouselId] || [];
        
        if (images.length === 0) return;
  
        const $img = $carousel.find('.carousel__img');
        const $prev = $carousel.find('.carousel__btn--prev');
        const $next = $carousel.find('.carousel__btn--next');
        const $idx = $carousel.find('.carousel__idx');
        const $total = $carousel.find('.carousel__total');
  
        let currentIndex = 0;
  
        $total.text(images.length);
  
        function render(direction = 0) {
          // Fade effect con jQuery
          $img.fadeOut(200, function() {
            $img.attr('src', images[currentIndex]);
            $idx.text(currentIndex + 1);
            $img.fadeIn(300);
          });
  
          // Ocultar botones si solo hay 1 imagen
          if (images.length <= 1) {
            $prev.hide();
            $next.hide();
          }
        }
  
        function navigate(direction) {
          currentIndex = (currentIndex + direction + images.length) % images.length;
          render(direction);
        }
  
        $prev.on('click', () => navigate(-1));
        $next.on('click', () => navigate(1));
  
        render();
      });
    }
  
    /* =========================
       7) SIMPLE PARALLAX
       ========================= */
    function initParallax() {
      if (typeof simpleParallax === 'undefined') return;
  
      const images = document.querySelectorAll('.js-parallax');
      if (images.length === 0) return;
  
      new simpleParallax(images, {
        scale: 1.2,
        delay: 0.3,
        transition: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        orientation: 'up'
      });
    }
  
    /* =========================
       8) CHART.JS - Clima de Madrid
       ========================= */
    function initClimateChart() {
      if (!$('body').hasClass('page-clima')) return;
  
      const ctx = document.getElementById('climateChart');
      if (!ctx) return;
  
      const isDark = $('body').hasClass('theme-dark');
      
      const chartData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            label: 'Temperatura Máxima (°C)',
            data: [10, 12, 16, 18, 22, 28, 33, 32, 27, 20, 14, 10],
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          },
          {
            label: 'Temperatura Mínima (°C)',
            data: [2, 3, 5, 7, 11, 16, 20, 20, 16, 11, 6, 3],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          },
          {
            label: 'Precipitación (mm)',
            data: [40, 35, 30, 45, 50, 25, 15, 10, 25, 50, 55, 50],
            borderColor: isDark ? '#95a5a6' : '#7f8c8d',
            backgroundColor: isDark ? 'rgba(149, 165, 166, 0.2)' : 'rgba(127, 140, 141, 0.2)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            yAxisID: 'y1'
          }
        ]
      };
  
      const config = {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 2,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                font: {
                  family: "'Inter', sans-serif",
                  size: 12,
                  weight: '500'
                },
                color: isDark ? '#a0a0a0' : '#666666',
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
              titleColor: isDark ? '#f5f5f5' : '#1a1a1a',
              bodyColor: isDark ? '#a0a0a0' : '#666666',
              borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              titleFont: {
                size: 13,
                weight: '600'
              },
              bodyFont: {
                size: 12
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: isDark ? '#a0a0a0' : '#666666',
                font: {
                  size: 11,
                  family: "'Inter', sans-serif"
                }
              },
              border: {
                color: isDark ? '#2a2a2a' : '#e5e5e5'
              }
            },
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Temperatura (°C)',
                color: isDark ? '#a0a0a0' : '#666666',
                font: {
                  size: 11,
                  weight: '500'
                }
              },
              grid: {
                color: isDark ? '#2a2a2a' : '#e5e5e5',
                drawBorder: false
              },
              ticks: {
                color: isDark ? '#a0a0a0' : '#666666',
                font: {
                  size: 11
                }
              },
              border: {
                display: false
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Precipitación (mm)',
                color: isDark ? '#a0a0a0' : '#666666',
                font: {
                  size: 11,
                  weight: '500'
                }
              },
              grid: {
                drawOnChartArea: false,
              },
              ticks: {
                color: isDark ? '#a0a0a0' : '#666666',
                font: {
                  size: 11
                }
              },
              border: {
                display: false
              }
            }
          }
        }
      };
  
      window.climateChart = new Chart(ctx, config);
    }
  
    // Actualizar colores del chart cuando cambia el tema
    function updateChartTheme(theme) {
      if (!window.climateChart) return;
      
      const isDark = theme === 'dark';
      const textColor = isDark ? '#a0a0a0' : '#666666';
      const gridColor = isDark ? '#2a2a2a' : '#e5e5e5';
      
      // Actualizar colores
      window.climateChart.options.plugins.legend.labels.color = textColor;
      window.climateChart.options.plugins.tooltip.backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
      window.climateChart.options.plugins.tooltip.titleColor = isDark ? '#f5f5f5' : '#1a1a1a';
      window.climateChart.options.plugins.tooltip.bodyColor = textColor;
      window.climateChart.options.plugins.tooltip.borderColor = isDark ? '#2a2a2a' : '#e5e5e5';
      
      // Actualizar ejes
      window.climateChart.options.scales.x.ticks.color = textColor;
      window.climateChart.options.scales.x.border.color = gridColor;
      window.climateChart.options.scales.y.title.color = textColor;
      window.climateChart.options.scales.y.grid.color = gridColor;
      window.climateChart.options.scales.y.ticks.color = textColor;
      window.climateChart.options.scales.y1.title.color = textColor;
      window.climateChart.options.scales.y1.ticks.color = textColor;
      
      // Actualizar dataset de precipitación
      window.climateChart.data.datasets[2].borderColor = isDark ? '#95a5a6' : '#7f8c8d';
      window.climateChart.data.datasets[2].backgroundColor = isDark ? 'rgba(149, 165, 166, 0.2)' : 'rgba(127, 140, 141, 0.2)';
      
      window.climateChart.update();
    }
  
    /* =========================
       9) SMOOTH SCROLL para enlaces internos
       ========================= */
    function initSmoothScroll() {
      $('a[href^="#"]').on('click', function(e) {
        const target = $(this).attr('href');
        if (target === '#') return;
        
        const $target = $(target);
        if ($target.length) {
          e.preventDefault();
          $('html, body').animate({
            scrollTop: $target.offset().top - 100
          }, 800);
        }
      });
    }
  
    /* =========================
       INITIALIZATION
       ========================= */
    $(document).ready(function() {
      initTheme();
      initBurger();
      initScrollAnimations();
      initHeaderScroll();
      initVisitasCategories();
      initCarousels();
      initParallax();
      initClimateChart();
      initSmoothScroll();
    });
  
  })(jQuery);