document.addEventListener("DOMContentLoaded", () => {
    const faqs = document.querySelectorAll(".faq-item");
  
    faqs.forEach((faq) => {
      const question = faq.querySelector(".faq-toggle");
      const answer = faq.querySelector(".faq-answer");
  
      question.addEventListener("click", (e) => {
        e.preventDefault();
        faqs.forEach((item) => {
          if (item !== faq) {
            item.classList.remove("open");
            item.querySelector(".faq-answer").style.height = "0px";
          }
        });
  
        if (faq.classList.contains("open")) {
          faq.classList.remove("open");
          answer.style.height = "0px";
        } else {
          faq.classList.add("open");
          const newHeight = answer.scrollHeight + "px";
          requestAnimationFrame(() => {
            answer.style.height = newHeight;
          });
        }
      });
    });
  });
  