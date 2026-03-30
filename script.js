document.addEventListener("DOMContentLoaded", function () {

    // ✅ Initialize EmailJS (PUT YOUR PUBLIC KEY)
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
            e.preventDefault();

            let name = document.getElementById("st").value.trim();
            let email = document.getElementById("ts").value.trim();
            let message = document.getElementById("fs").value.trim();

            if (!name || !email || !message) {
                alert("⚠️ Please fill all fields");
                return;
            }

            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
                name: name,
                email: email,
                message: message
            })
            .then(function () {
                let success = document.getElementById("successMessage");

                if (success) {
                    success.style.display = "block";
                    success.innerText = "✅ Message sent successfully!";
                }

                // clear form
                document.getElementById("st").value = "";
                document.getElementById("ts").value = "";
                document.getElementById("fs").value = "";

                // hide message after 3 sec
                setTimeout(() => {
                    if (success) success.style.display = "none";
                }, 3000);
            })
            .catch(function (error) {
                console.error(error);
                alert("❌ Failed to send message");
            });
        };
    }

    // ❤️ Like Button (Simple Version)
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

            localStorage.setItem("likes", count);
            localStorage.setItem("liked", liked);

            // 🔄 reload page
            location.reload();
        };
    }

});