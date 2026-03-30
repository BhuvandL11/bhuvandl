document.addEventListener("DOMContentLoaded", function () {

    // ✅ Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY");

    // 📱 Mobile Menu
    let hamburger = document.getElementById("hamburger");
    let mobileNav = document.getElementById("mobileNav");

    if (hamburger && mobileNav) {
        hamburger.onclick = function () {
            hamburger.classList.toggle("active");
            mobileNav.classList.toggle("active");
        };
    }

    // 📩 Contact Form + EmailJS
    let btn = document.getElementById("button");

    if (btn) {
        btn.onclick = function (e) {
            e.preventDefault(); // ✅ stop reload

            let name = document.getElementById("st").value.trim();
            let email = document.getElementById("ts").value.trim();
            let message = document.getElementById("fs").value.trim();

            if (!name || !email || !message) {
                alert("⚠️ Fill all fields");
                return;
            }

            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
                name: name,
                email: email,
                message: message
            })
            .then(function () {
                let success = document.getElementById("successMessage");
                if (success) success.style.display = "block";
                

                // clear form
                document.getElementById("st").value = "";
                document.getElementById("ts").value = "";
                document.getElementById("fs").value = "";

                setTimeout(() => {
                    if (success) success.style.display = "successfully  completed";
                }, 3000);
                
            })
      
    
            .catch(function (error) {
                console.error(error);
                alert("filled successfully");
            });
        };
    }

    // ❤️ Like Button
    let likeBtn = document.getElementById("likeBtn");
    let likeCountText = document.getElementById("likeCount");

    if (likeBtn && likeCountText) {

        let count = parseInt(localStorage.getItem("likes")) || 0;
        let liked = localStorage.getItem("liked") === "true";

        likeCountText.textContent = count;

        function updateBtn() {
            likeBtn.textContent = liked ? "❤️ Unlike" : "❤️ Like";
        }

        updateBtn();

        likeBtn.onclick = function () {
            if (liked) {
                count--;
                liked = false;
            } else {
                count++;
                liked = true;
            }

            likeCountText.textContent = count;
            localStorage.setItem("likes", count);
            localStorage.setItem("liked", liked);

            updateBtn();
        };
    }

});












