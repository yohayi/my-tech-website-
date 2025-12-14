// 导航菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // 关闭菜单当点击链接时
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // 代码标签切换
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // 移除所有按钮的active类
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // 添加active类到当前按钮
                this.classList.add('active');
                
                // 隐藏所有内容
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // 显示对应的内容
                const activeContent = document.getElementById(tabId);
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            });
        });
    }
    
    // 滚动效果 - 添加滚动时导航栏背景
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'white';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                
                if (href.startsWith('#') && href.length > 1) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
    
    // 性能指标动画
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current) + (element.classList.contains('percent') ? '%' : '');
        }, 20);
    }
    
    // 当性能指标进入视口时触发动画
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metricValue = entry.target.querySelector('.metric-value');
                if (metricValue) {
                    const valueText = metricValue.textContent;
                    const numericValue = parseFloat(valueText.replace(/[^0-9.]/g, ''));
                    
                    if (!isNaN(numericValue)) {
                        metricValue.textContent = '0';
                        setTimeout(() => {
                            animateCounter(metricValue, numericValue);
                        }, 300);
                    }
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.metric-card').forEach(card => {
        observer.observe(card);
    });
});
