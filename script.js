/** ============================== Change Header Bg======================================**/
window.onscroll = function () {
    const header = document.getElementById('header');

    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
};


/**======================================== Preloader=============================================**/
(function () {
    const loader = document.getElementById("preloader");
    if (loader) {
        const displayDuration = 2000;

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = "0";
                setTimeout(() => {
                    loader.style.display = "none";
                }, 500);

            }, displayDuration);
        });
    }
})();

    /* =========================Language Switch==========================*/

        const langSwitch = document.getElementById('languageToggle');

        if (langSwitch) {
            langSwitch.onclick = function () {
                const isArabic = this.innerText === 'EN';
                const textsToTranslate = document.querySelectorAll('.lang-text');

                if (isArabic) {
                    this.innerText = 'AR';
                    document.documentElement.dir = 'ltr';
                    textsToTranslate.forEach(el => {
                        if (!el.getAttribute('data-ar')) el.setAttribute('data-ar', el.innerText);
                        el.innerText = el.getAttribute('data-en');
                    });
                } else {
                    this.innerText = 'EN';
                    document.documentElement.dir = 'rtl';
                    textsToTranslate.forEach(el => {
                        el.innerText = el.getAttribute('data-ar');
                    });
                }
            };
        }
        /*========================================== Calc Power===================================*/


        document.addEventListener('DOMContentLoaded', function () {
            const modal = document.getElementById('energy-modal');
            const calcBtns = document.querySelectorAll('.calc-btn');
            const closeBtn = document.getElementById('closeModalBtn');
            const questions = [
                { q: "ما هو نوع الإضاءة الرئيسي في منزلك؟", options: [{ t: "مصابيح LED بالكامل", p: 10 }, { t: "خليط بين LED وعادي", p: 40 }, { t: "مصابيح عادية (توهج)", p: 90 }] },
                { q: "كم ساعة يعمل التكييف يومياً في الصيف؟", options: [{ t: "لا أستخدم تكييف", p: 0 }, { t: "من 1 إلى 4 ساعات", p: 120 }, { t: "أكثر من 6 ساعات", p: 250 }] },
                { q: "كيف تعتمد على السخان الكهربائي؟", options: [{ t: "سخان غاز / شمسي", p: 0 }, { t: "يعمل وقت الاستخدام فقط", p: 50 }, { t: "يعمل طوال اليوم", p: 150 }] },
                { q: "عدد الأجهزة الثقيلة (غسالة، مجفف، غسالة أطباق)؟", options: [{ t: "جهاز واحد أو أقل", p: 30 }, { t: "من 2 إلى 3 أجهزة", p: 80 }, { t: "أكثر من 3 أجهزة", p: 160 }] },
                { q: "هل تقوم بفصل الأجهزة غير المستخدمة من القابس؟", options: [{ t: "دائماً (موفر جداً)", p: -10 }, { t: "أحياناً", p: 10 }, { t: "نادراً", p: 40 }] }
            ];


            let currentStep = 0;
            let totalScore = 0;


            function renderQuestion() {
                const qText = document.getElementById('q-text');
                const list = document.getElementById('options-list');
                const bar = document.getElementById('bar');
                const stepNum = document.getElementById('step-num');
                const curr = questions[currentStep];
                qText.classList.remove('animate-fade-in');
                void qText.offsetWidth;
                qText.classList.add('animate-fade-in');
                qText.innerText = curr.q;
                stepNum.innerText = `${currentStep + 1} / ${questions.length}`;
                bar.style.width = ((currentStep + 1) / questions.length) * 100 + "%";

                list.innerHTML = '';
                curr.options.forEach((opt, index) => {
                    const btn = document.createElement('button');
                    btn.className = "option-btn-blue animate-fade-in";
                    btn.style.animationDelay = (index * 0.1) + "s";
                    btn.innerText = opt.t;
                    btn.onclick = () => {
                        totalScore += opt.p;
                        if (++currentStep < questions.length) renderQuestion(); else showFinalResult();
                    };
                    list.appendChild(btn);
                });
            }


            function showFinalResult() {
                document.getElementById('quiz-content').classList.add('hidden');
                const resultUI = document.getElementById('result-content');
                resultUI.classList.remove('hidden');

                const valEl = document.getElementById('user-val');
                const advice = document.getElementById('advice-text');
                const icon = document.getElementById('status-icon');
                const label = document.getElementById('rating-label');


                let count = 0;
                const target = totalScore < 0 ? 0 : totalScore;
                const speed = target / 50;
                const timer = setInterval(() => {
                    count += speed;
                    if (count >= target) {
                        valEl.innerText = Math.floor(target);
                        clearInterval(timer);
                    } else {
                        valEl.innerText = Math.floor(count);
                    }
                }, 20);


                if (target > 350) {
                    icon.innerText = "🔥";
                    label.innerText = "استهلاك مرتفع جداً";
                    label.className = "text-red-400 font-bold tracking-widest text-sm uppercase mb-8";
                    advice.innerText = "أنت تنفق الكثير! ننصحك فوراً بفحص الأجهزة القديمة والتحول للطاقة الشمسية لتوفير 70% من فاتورتك.";
                } else if (target > 150) {
                    icon.innerText = "⚡";
                    label.innerText = "استهلاك متوسط";
                    label.className = "text-blue-400 font-bold tracking-widest text-sm uppercase mb-8";
                    advice.innerText = "استهلاكك في النطاق الطبيعي، ولكن يمكنك تقليله أكثر باستبدال ما تبقى من مصابيح بـ LED وفصل الأجهزة ليلاً.";
                } else {
                    icon.innerText = "🌿";
                    label.innerText = "بطل توفير الطاقة";
                    label.className = "text-emerald-400 font-bold tracking-widest text-sm uppercase mb-8";
                    advice.innerText = "مذهل! أنت صديق للبيئة وموفر محترف. حافظ على هذا الأداء الرائع.";
                }
            }


            window.closeEnergyModal = () => { modal.style.display = 'none'; };

            calcBtns.forEach(btn => {
                btn.onclick = (e) => {
                    e.preventDefault();
                    modal.style.display = 'flex';
                    currentStep = 0; totalScore = 0;
                    document.getElementById('quiz-content').classList.remove('hidden');
                    document.getElementById('result-content').classList.add('hidden');
                    renderQuestion();
                };
            });

            if (closeBtn) closeBtn.onclick = closeEnergyModal;
            window.onclick = (e) => { if (e.target == modal) closeEnergyModal(); };
        });
        ML = '';


        /*============================== Change Color Theme ======================================*/

        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');

        if (themeToggle) {
            themeToggle.onclick = function () {
                document.body.classList.toggle('dark-theme');
                if (document.body.classList.contains('dark-theme')) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                    themeIcon.style.color = '#facc15';
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                    themeIcon.style.color = '';
                }

                const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
                localStorage.setItem('theme', currentTheme);
            };
        }

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            themeIcon.style.color = '#facc15';
        }


/* Extracted from index.html */
const regionsData = {
            "cairo": {
                name: { ar: "القاهرة", en: "Cairo" },
                projects: { ar: "800", en: "800" },
                buildings: { ar: "50 ألف", en: "50K" },
                leds: { ar: "6 مليون", en: "6.0M" },
                energy: { ar: "10 مليار", en: "10B" },
                oil: { ar: "18 مليون", en: "18 Million" },
                seedlings: { ar: "95 مليون", en: "95 Million" }
            },
            "alexandria": {
                name: { ar: "الإسكندرية", en: "Alexandria" },
                projects: { ar: "400", en: "400" },
                buildings: { ar: "25 ألف", en: "25K" },
                leds: { ar: "3.1 مليون", en: "3.1M" },
                energy: { ar: "5.5 مليار", en: "5.5B" },
                oil: { ar: "9 مليون", en: "9 Million" },
                seedlings: { ar: "45 مليون", en: "45 Million" }
            },
            "port-said": {
                name: { ar: "بورسعيد", en: "Port Said" },
                projects: { ar: "120", en: "120" },
                buildings: { ar: "8 ألف", en: "8K" },
                leds: { ar: "1.2 مليون", en: "1.2M" },
                energy: { ar: "2.1 مليار", en: "2.1B" },
                oil: { ar: "3.5 مليون", en: "3.5 Million" },
                seedlings: { ar: "18 مليون", en: "18 Million" }
            },
            "ismailia": {
                name: { ar: "الإسماعيلية", en: "Ismailia" },
                projects: { ar: "150", en: "150" },
                buildings: { ar: "10 ألف", en: "10K" },
                leds: { ar: "1.5 مليون", en: "1.5M" },
                energy: { ar: "2.8 مليار", en: "2.8B" },
                oil: { ar: "4.2 مليون", en: "4.2 Million" },
                seedlings: { ar: "22 مليون", en: "22 Million" }
            },
            "tanta": {
                name: { ar: "طنطا", en: "Tanta" },
                projects: { ar: "200", en: "200" },
                buildings: { ar: "15 ألف", en: "15K" },
                leds: { ar: "2.0 مليون", en: "2.0M" },
                energy: { ar: "3.5 مليار", en: "3.5B" },
                oil: { ar: "5.5 مليون", en: "5.5 Million" },
                seedlings: { ar: "28 مليون", en: "28 Million" }
            },
            "arish": {
                name: { ar: "العريش", en: "Arish" },
                projects: { ar: "80", en: "80" },
                buildings: { ar: "5 ألف", en: "5K" },
                leds: { ar: "0.8 مليون", en: "0.8M" },
                energy: { ar: "1.2 مليار", en: "1.2B" },
                oil: { ar: "2.0 مليون", en: "2.0 Million" },
                seedlings: { ar: "10 مليون", en: "10 Million" }
            },
            "sharm": {
                name: { ar: "شرم الشيخ", en: "Sharm El Sheikh" },
                projects: { ar: "300", en: "300" },
                buildings: { ar: "20 ألف", en: "20K" },
                leds: { ar: "2.5 مليون", en: "2.5M" },
                energy: { ar: "4.5 مليار", en: "4.5B" },
                oil: { ar: "7.0 مليون", en: "7.0 Million" },
                seedlings: { ar: "35 مليون", en: "35 Million" }
            },
            "hurghada": {
                name: { ar: "الغردقة", en: "Hurghada" },
                projects: { ar: "280", en: "280" },
                buildings: { ar: "18 ألف", en: "18K" },
                leds: { ar: "2.2 مليون", en: "2.2M" },
                energy: { ar: "4.0 مليار", en: "4.0B" },
                oil: { ar: "6.5 مليون", en: "6.5 Million" },
                seedlings: { ar: "32 مليون", en: "32 Million" }
            },
            "minya": {
                name: { ar: "المنيا", en: "Minya" },
                projects: { ar: "180", en: "180" },
                buildings: { ar: "12 ألف", en: "12K" },
                leds: { ar: "1.6 مليون", en: "1.6M" },
                energy: { ar: "2.9 مليار", en: "2.9B" },
                oil: { ar: "4.5 مليون", en: "4.5 Million" },
                seedlings: { ar: "24 مليون", en: "24 Million" }
            },
            "asyut": {
                name: { ar: "أسيوط", en: "Asyut" },
                projects: { ar: "220", en: "220" },
                buildings: { ar: "14 ألف", en: "14K" },
                leds: { ar: "1.8 مليون", en: "1.8M" },
                energy: { ar: "3.2 مليار", en: "3.2B" },
                oil: { ar: "5.0 مليون", en: "5.0 Million" },
                seedlings: { ar: "26 مليون", en: "26 Million" }
            },
            "qena": {
                name: { ar: "قنا", en: "Qena" },
                projects: { ar: "160", en: "160" },
                buildings: { ar: "11 ألف", en: "11K" },
                leds: { ar: "1.4 مليون", en: "1.4M" },
                energy: { ar: "2.5 مليار", en: "2.5B" },
                oil: { ar: "3.8 مليون", en: "3.8 Million" },
                seedlings: { ar: "20 مليون", en: "20 Million" }
            },
            "luxor": {
                name: { ar: "الأقصر", en: "Luxor" },
                projects: { ar: "250", en: "250" },
                buildings: { ar: "16 ألف", en: "16K" },
                leds: { ar: "2.1 مليون", en: "2.1M" },
                energy: { ar: "3.8 مليار", en: "3.8B" },
                oil: { ar: "6.0 مليون", en: "6.0 Million" },
                seedlings: { ar: "30 مليون", en: "30 Million" }
            },
            "aswan": {
                name: { ar: "أسوان", en: "Aswan" },
                projects: { ar: "350", en: "350" },
                buildings: { ar: "22 ألف", en: "22K" },
                leds: { ar: "3.0 مليون", en: "3.0M" },
                energy: { ar: "5.0 مليار", en: "5.0B" },
                oil: { ar: "8.5 مليون", en: "8.5 Million" },
                seedlings: { ar: "40 مليون", en: "40 Million" }
            },
            "matrouh": {
                name: { ar: "مطروح", en: "Matrouh" },
                projects: { ar: "90", en: "90" },
                buildings: { ar: "6 ألف", en: "6K" },
                leds: { ar: "0.9 مليون", en: "0.9M" },
                energy: { ar: "1.5 مليار", en: "1.5B" },
                oil: { ar: "2.2 مليون", en: "2.2 Million" },
                seedlings: { ar: "12 مليون", en: "12 Million" }
            },
            "oasis": {
                name: { ar: "الواحات", en: "Oasis" },
                projects: { ar: "50", en: "50" },
                buildings: { ar: "3 ألف", en: "3K" },
                leds: { ar: "0.5 مليون", en: "0.5M" },
                energy: { ar: "0.8 مليار", en: "0.8B" },
                oil: { ar: "1.2 مليون", en: "1.2 Million" },
                seedlings: { ar: "6 مليون", en: "6 Million" }
            },
            "toshka": {
                name: { ar: "توشكى", en: "Toshka" },
                projects: { ar: "110", en: "110" },
                buildings: { ar: "7 ألف", en: "7K" },
                leds: { ar: "1.1 مليون", en: "1.1M" },
                energy: { ar: "1.9 مليار", en: "1.9B" },
                oil: { ar: "3.0 مليون", en: "3.0 Million" },
                seedlings: { ar: "15 مليون", en: "15 Million" }
            },
            "beheira": {
                name: { ar: "البحيرة", en: "Beheira" },
                projects: { ar: "140", en: "140" },
                buildings: { ar: "9 ألف", en: "9K" },
                leds: { ar: "1.3 مليون", en: "1.3M" },
                energy: { ar: "2.3 مليار", en: "2.3B" },
                oil: { ar: "3.6 مليون", en: "3.6 Million" },
                seedlings: { ar: "19 مليون", en: "19 Million" }
            },
            "kafr-el-sheikh": {
                name: { ar: "كفر الشيخ", en: "Kafr El-Sheikh" },
                projects: { ar: "110", en: "110" },
                buildings: { ar: "7 ألف", en: "7K" },
                leds: { ar: "1.0 مليون", en: "1.0M" },
                energy: { ar: "1.8 مليار", en: "1.8B" },
                oil: { ar: "2.9 مليون", en: "2.9 Million" },
                seedlings: { ar: "14 مليون", en: "14 Million" }
            },
            "dakahlia": {
                name: { ar: "الدقهلية", en: "Dakahlia" },
                projects: { ar: "170", en: "170" },
                buildings: { ar: "11 ألف", en: "11K" },
                leds: { ar: "1.7 مليون", en: "1.7M" },
                energy: { ar: "3.0 مليار", en: "3.0B" },
                oil: { ar: "4.8 مليون", en: "4.8 Million" },
                seedlings: { ar: "23 مليون", en: "23 Million" }
            },
            "damietta": {
                name: { ar: "دمياط", en: "Damietta" },
                projects: { ar: "90", en: "90" },
                buildings: { ar: "6 ألف", en: "6K" },
                leds: { ar: "0.8 مليون", en: "0.8M" },
                energy: { ar: "1.4 مليار", en: "1.4B" },
                oil: { ar: "2.1 مليون", en: "2.1 Million" },
                seedlings: { ar: "11 مليون", en: "11 Million" }
            },
            "suez": {
                name: { ar: "السويس", en: "Suez" },
                projects: { ar: "130", en: "130" },
                buildings: { ar: "8 ألف", en: "8K" },
                leds: { ar: "1.1 مليون", en: "1.1M" },
                energy: { ar: "2.0 مليار", en: "2.0B" },
                oil: { ar: "3.2 مليون", en: "3.2 Million" },
                seedlings: { ar: "16 مليون", en: "16 Million" }
            },
            "giza": {
                name: { ar: "الجيزة", en: "Giza" },
                projects: { ar: "500", en: "500" },
                buildings: { ar: "30 ألف", en: "30K" },
                leds: { ar: "4.0 مليون", en: "4.0M" },
                energy: { ar: "6.5 مليار", en: "6.5B" },
                oil: { ar: "10 مليون", en: "10 Million" },
                seedlings: { ar: "60 مليون", en: "60 Million" }
            },
            "fayoum": {
                name: { ar: "الفيوم", en: "Fayoum" },
                projects: { ar: "140", en: "140" },
                buildings: { ar: "9 ألف", en: "9K" },
                leds: { ar: "1.2 مليون", en: "1.2M" },
                energy: { ar: "2.2 مليار", en: "2.2B" },
                oil: { ar: "3.4 مليون", en: "3.4 Million" },
                seedlings: { ar: "18 مليون", en: "18 Million" }
            },
            "beni-suef": {
                name: { ar: "بني سويف", en: "Beni Suef" },
                projects: { ar: "120", en: "120" },
                buildings: { ar: "8 ألف", en: "8K" },
                leds: { ar: "1.1 مليون", en: "1.1M" },
                energy: { ar: "1.9 مليار", en: "1.9B" },
                oil: { ar: "3.0 مليون", en: "3.0 Million" },
                seedlings: { ar: "15 مليون", en: "15 Million" }
            },
            "sohag": {
                name: { ar: "سوهاج", en: "Sohag" },
                projects: { ar: "190", en: "190" },
                buildings: { ar: "12 ألف", en: "12K" },
                leds: { ar: "1.5 مليون", en: "1.5M" },
                energy: { ar: "2.7 مليار", en: "2.7B" },
                oil: { ar: "4.0 مليون", en: "4.0 Million" },
                seedlings: { ar: "21 مليون", en: "21 Million" }
            },
            "new-valley": {
                name: { ar: "الوادي الجديد", en: "New Valley" },
                projects: { ar: "70", en: "70" },
                buildings: { ar: "4 ألف", en: "4K" },
                leds: { ar: "0.6 مليون", en: "0.6M" },
                energy: { ar: "1.0 مليار", en: "1.0B" },
                oil: { ar: "1.6 مليون", en: "1.6 Million" },
                seedlings: { ar: "8 مليون", en: "8 Million" }
            }
        };

        // Number Counter-Up Animation Logic
        function animateCounter(el, targetString) {
            // Find if there's a numeric part
            const match = targetString.match(/([\d\.]+)/);
            if (!match) {
                el.innerText = targetString;
                return;
            }

            const targetNum = parseFloat(match[1]);
            const isFloat = match[1].includes('.');
            const prefix = targetString.substring(0, match.index);
            const suffix = targetString.substring(match.index + match[1].length);

            let startTimestamp = null;
            const duration = 1200; // 1.2 seconds

            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                // easeOutQuad
                const easeProgress = progress * (2 - progress);
                const currentNum = easeProgress * targetNum;

                let displayNum = isFloat ? currentNum.toFixed(1) : Math.floor(currentNum);

                el.innerText = prefix + displayNum + suffix;

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    el.innerText = targetString;
                }
            };
            window.requestAnimationFrame(step);
        }

        function updateRegionData(regionId) {
            const data = regionsData[regionId];
            if (!data) return;

            const updateElement = (elementId, newData) => {
                const el = document.getElementById(elementId);
                if (el) {
                    el.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(10px) scale(0.95)';
                    el.style.textShadow = '0 0 15px rgba(59, 130, 246, 0.8)';
                    el.style.color = '#60a5fa';

                    setTimeout(() => {
                        el.setAttribute('data-en', newData.en);
                        el.setAttribute('data-ar', newData.ar);

                        const langSwitch = document.getElementById('languageToggle');
                        const isEn = langSwitch && langSwitch.innerText === 'AR';
                        const targetString = isEn ? newData.en : newData.ar;
                        
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0) scale(1)';
                        el.style.color = '';

                        // Fire counter animation
                        animateCounter(el, targetString);

                        setTimeout(() => {
                            el.style.textShadow = '';
                        }, 400);

                    }, 400);
                }
            };

            updateElement('projects-count', data.projects);
            updateElement('buildings-count', data.buildings);
            updateElement('leds-count', data.leds);
            updateElement('energy-savings', data.energy);
            updateElement('oil-saved', data.oil);
            updateElement('seedlings-count', data.seedlings);
        }

        const mapSide = document.querySelector('.map-side');
        const mapTooltip = document.getElementById('map-tooltip');

        document.querySelectorAll('.map-dot').forEach(dot => {
            dot.removeAttribute('title');
            dot.addEventListener('mouseenter', function (e) {
                const regionId = this.getAttribute('data-region');
                if (!regionId || !regionsData[regionId]) return;

                const langSwitch = document.getElementById('languageToggle');
                const isEn = langSwitch && langSwitch.innerText === 'AR';
                mapTooltip.innerText = isEn ? regionsData[regionId].name.en : regionsData[regionId].name.ar;
                mapTooltip.classList.add('visible');
            });

            dot.addEventListener('mousemove', function (e) {
                const rect = mapSide.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                mapTooltip.style.left = x + 'px';
                mapTooltip.style.top = (y - 15) + 'px';
            });

            dot.addEventListener('mouseleave', function () {
                mapTooltip.classList.remove('visible');
            });

            // Click Logic
            dot.addEventListener('click', function () {
                const regionId = this.getAttribute('data-region');
                if (!regionId) return;

                updateRegionData(regionId);

                document.querySelectorAll('.map-dot').forEach(d => {
                    d.classList.remove('active');
                    d.style.boxShadow = '';
                    d.style.transform = '';
                    d.style.backgroundColor = '';
                });

                this.classList.add('active');
                this.style.boxShadow = '0 0 20px 8px rgba(59, 130, 246, 0.8)';
                this.style.transform = 'scale(1.4)';
                this.style.backgroundColor = '#60a5fa';
            });
        });


        // ================= Energy Insights Modal & FAB Logic =================
        const energyInsightsData = {
            "cairo": {
                name: "القاهرة",
                climate: "منطقة صحراوية / جزيرة حرارية حضرية",
                peakHours: "18:00 - 23:00",
                proposedShedding: "14:00 - 15:00 (بالتناوب)",
                totalCapacityMW: 8500,
                tips: "اضبط أجهزة التكييف على درجة 24 مئوية، وتأكد من إغلاق النوافذ بإحكام لمنع تسرب الهواء البارد، خاصة في المناطق الحضرية المزدحمة لتقليل استهلاك الطاقة.",
                math: {
                    households: 2000000,
                    avgACPowerKW: 1.5,
                    hoursReduced: 2
                }
            },
            "alexandria": {
                name: "الإسكندرية",
                climate: "ساحلية / رطبة",
                peakHours: "19:00 - 00:00",
                proposedShedding: "13:00 - 14:00 (بالتناوب)",
                totalCapacityMW: 4200,
                tips: "استفد من نسيم البحر المعتدل نهاراً لتقليل الاعتماد على التكييف، واستخدم مزيلات الرطوبة بكفاءة عالية في المساء لتقليل الأحمال الزائدة.",
                math: {
                    households: 1000000,
                    avgACPowerKW: 1.5,
                    hoursReduced: 2
                }
            }
        };

        const headerBtn = document.getElementById('energy-header-btn');
        const insightsModal = document.getElementById('insights-modal-overlay');
        const insightsClose = document.getElementById('insights-close');
        let activeRegionForInsights = null;

        document.querySelectorAll('.map-dot').forEach(dot => {
            dot.addEventListener('click', function (e) {
                e.stopPropagation(); 
                const regionId = this.getAttribute('data-region');
                if (!regionId) return;
                activeRegionForInsights = regionId;
                
                headerBtn.classList.remove('hidden');
                // Allow browser to register removal of 'hidden' before transitioning opacity
                setTimeout(() => headerBtn.classList.add('visible'), 10);
            });
        });

        headerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!activeRegionForInsights) return;
            
            const data = energyInsightsData[activeRegionForInsights] || energyInsightsData["cairo"]; 

            document.getElementById('insights-climate').innerText = `${data.name} | ${data.climate}`;
            document.getElementById('insights-tips').innerText = data.tips;
            document.getElementById('insights-peak').innerText = data.peakHours;
            document.getElementById('insights-shedding').innerText = data.proposedShedding;
            
            // Mathematical Calculations dynamically
            const targetHouseholds = data.math.households * 0.1; // 10%
            const totalEnergySavedMWh = (targetHouseholds * data.math.avgACPowerKW * data.math.hoursReduced) / 1000;

            const mathHTML = `
                <div style="margin-bottom:12px; color: #3b82f6; font-weight: 800; font-size: 1.4rem; text-align: center; direction: ltr;">$$E = P \\times t$$</div>
                <div style="color: #cbd5e1; font-size: 1.05rem; margin-bottom: 12px; line-height: 1.8;">
                    إذا قام <strong>10%</strong> من إجمالي الأسر المشاركة بإطفاء أجهزة التكييف (بمتوسط قدرة <strong>${data.math.avgACPowerKW}</strong> كيلوواط) لمدة <strong>${data.math.hoursReduced}</strong> ساعة وقت الذروة، فإن إجمالي الطاقة الموفرة يُحسب كالتالي:
                </div>
                <div style="margin-top:15px; border-top: 1px dashed rgba(255,255,255,0.15); padding-top:15px; direction: ltr; text-align: left; font-family: monospace;">
                    <span style="color: #94a3b8;">Calculation:</span><br>
                    = ( ${targetHouseholds.toLocaleString()} households × ${data.math.avgACPowerKW} kW × ${data.math.hoursReduced} h ) / 1000<br>
                    <strong style="color: #22d3ee; font-size: 1.4rem; display: block; margin-top: 10px;">= ${totalEnergySavedMWh.toLocaleString()} MWh</strong>
                </div>
                <div style="margin-top:15px; padding: 15px; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; color: #fbbf24; text-align: center; font-size: 1.1rem; line-height: 1.8;">
                    <strong>النتيجة:</strong> تم توفير <strong>${totalEnergySavedMWh.toLocaleString()} ميجاواط/ساعة</strong> من الضغط على الشبكة القومية بنجاح!
                </div>
            `;
            document.getElementById('insights-math-formula').innerHTML = mathHTML;

            insightsModal.classList.add('open');
        });

        const closeInsights = () => {
            insightsModal.classList.remove('open');
        };

        insightsClose.addEventListener('click', closeInsights);
        insightsModal.addEventListener('click', (e) => {
            if (e.target === insightsModal) closeInsights();
        });

        document.addEventListener('click', (e) => {
            if (!e.target.classList.contains('map-dot') && !e.target.closest('#energy-header-btn') && !e.target.closest('.insights-modal-overlay')) {
                headerBtn.classList.remove('visible');
                setTimeout(() => headerBtn.classList.add('hidden'), 400);
                activeRegionForInsights = null;
                
                // Clear active states visually
                document.querySelectorAll('.map-dot').forEach(d => {
                    d.classList.remove('active');
                    d.style.boxShadow = '';
                    d.style.transform = '';
                    d.style.backgroundColor = '';
                });
            }
        });
       
