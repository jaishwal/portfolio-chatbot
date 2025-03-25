$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("RZ1JM84Fn_WBdehUP");

        emailjs.sendForm('service_75l74us', 'template_smaw4ug', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "web designing", "Java Developer", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

fetchData().then(data => {
    showSkills(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->

// chatbot logic start here
document.getElementById("chatbot-toggle").addEventListener("click", function () {
    let chatWindow = document.getElementById("chat-window");

    // Toggle chat window
    if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
        chatWindow.style.display = "block";
    } else {
        chatWindow.style.display = "none";
    }
});

// Close button functionality
document.getElementById("close-chat").addEventListener("click", function () {
    document.getElementById("chat-window").style.display = "none";
});

// Send message functionality
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    let userInput = document.getElementById("user-input");
    let messageText = userInput.value.trim();

    if (messageText === "") return; // Empty message ignore

    // User message show
    addMessage("You: " + messageText);

    // Bot ka reply
    setTimeout(() => {
        let botReply = getBotReply(messageText);
        addMessage("Bot: " + botReply);
    }, 500);

    userInput.value = ""; // Input field clear after sending message
}

function addMessage(message) {
    let messagesDiv = document.getElementById("messages");
    let messageElement = document.createElement("div");
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to latest message
}

function getBotReply(message) {
    let responses = {
        "hi": "Hello!😊, How can I assist you?",
        "hello": "Hey there! 😊",
        "portfolio": "This is my portfolio. Want to see projects?",
        "contact": "You can contact me at dheerajjaiswal3333@gmail.com",
        "default": "Sorry, I didn't understand. Can you ask something else?"
    };
    return responses[message.toLowerCase()] || responses["default"];
}

