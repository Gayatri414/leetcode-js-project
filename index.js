document.addEventListener("DOMContentLoaded", function () {
    const searchbutton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");

    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");

    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    function validUserName(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-api-faisalshohag.vercel.app/${username}`;
        try {
            searchbutton.textContent = "Searching..";
            searchbutton.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch the user details");
            }

            const data = await response.json();
            console.log("Logging data: ", data);

            // ✅ Update progress and labels
            updateStats(data);
        } catch (error) {
            console.error(error.message);
        } finally {
            searchbutton.textContent = "Search";
            searchbutton.disabled = false;
        }
    }

    function updateStats(data) {
        // Calculate percentages
        const easyPercent = (data.easySolved / data.totalEasy) * 100;
        const mediumPercent = (data.mediumSolved / data.totalMedium) * 100;
        const hardPercent = (data.hardSolved / data.totalHard) * 100;

        // Update circle progress (using conic-gradient background)
        easyProgressCircle.style.background = `conic-gradient(green ${easyPercent}%, lightgray 0%)`;
        mediumProgressCircle.style.background = `conic-gradient(orange ${mediumPercent}%, lightgray 0%)`;
        hardProgressCircle.style.background = `conic-gradient(red ${hardPercent}%, lightgray 0%)`;

        // Update labels
        easyLabel.textContent = `${data.easySolved} / ${data.totalEasy}`;
        mediumLabel.textContent = `${data.mediumSolved} / ${data.totalMedium}`;
        hardLabel.textContent = `${data.hardSolved} / ${data.totalHard}`;
    }

    searchbutton.addEventListener("click", function () {
        const username = usernameInput.value;
        console.log("Logging username:", username);
        if (validUserName(username)) {
            fetchUserDetails(username);
        }
    });
});
