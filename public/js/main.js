window.addEventListener("DOMContentLoaded", () => {
    
    const socket = io();

socket.on('message', message => {
    console.log(message);
})

    const button = document.getElementById("button");
    const result = document.getElementById("result");
    const main = document.getElementsByTagName("main")[0];


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition



if (typeof SpeechRecognition === "undefined") {
    button.remove();
    // const message = document.getElementById("message");
    // message.removeAttribute("hidden");
    // message.setAttribute("aria-hidden", "false");
} else {

    
    let listening = false;
    const recognition = new SpeechRecognition();

    const start = () => {
        recognition.start();
        button.textContent = "Stop listening";
        main.classList.add("speaking");
    };

    const stop = () => {
        recognition.stop();
        button.textContent = "Start listening";
        main.classList.remove("speaking");
    };

    const onResult = event => {
        result.innerHTML = "";
        for (const res of event.results) {
          
          if (res.isFinal) {
            const text = document.createTextNode(res[0].transcript);
          const p = document.createElement("p");  
            p.classList.add("final");
            p.appendChild(text);
            
            result.innerHTML = '';
            result.appendChild(p);
            socket.emit('speechRecognized', res[0].transcript);
          }
        }
    };

        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.addEventListener("result", onResult);

        button.addEventListener("click", () => {
            listening ? stop() : start();
            listening = !listening;
          });
}
});