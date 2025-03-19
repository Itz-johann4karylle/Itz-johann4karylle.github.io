document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const sidebar = document.querySelector(".sidebar");
    const productivityTools = document.getElementById("productivityTools");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    menuIcon.addEventListener("click", function () {
        sidebar.classList.toggle("expanded"); // Expands sidebar
        sidebar.classList.toggle("hidden"); // Toggles transparency
    });

    // Toggle Productivity Tools Dropdown
    productivityTools.addEventListener("click", function (event) {
        event.preventDefault(); 
        dropdownMenu.classList.toggle("show");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    renderCalendar();
    updateUpcomingEvents();
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("saveEventButton").addEventListener("click", saveEvent);
});

document.addEventListener("DOMContentLoaded", () => {
    const calendarDays = document.getElementById("calendarDays");
    const currentMonth = document.getElementById("currentMonth");
    const prevMonthButton = document.getElementById("prevMonth");
    const nextMonthButton = document.getElementById("nextMonth");
    const addEventButton = document.getElementById("addEvent");
    const editEventButton = document.getElementById("editEvent");

    const addEventModal = document.getElementById("addEventModal");
    const editEventModal = document.getElementById("editEventModal");
    const closeAddModal = document.getElementById("closeAddModal");
    const closeEditModal = document.getElementById("closeEditModal");

    let selectedDate = null;
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonthIndex = today.getMonth();
    let events = JSON.parse(localStorage.getItem("events")) || {}

    function renderCalendar() {
        calendarDays.innerHTML = "";
        currentMonth.textContent = new Date(currentYear, currentMonthIndex).toLocaleDateString("en-US", { month: "long", year: "numeric" });
        
        let firstDay = new Date(currentYear, currentMonthIndex, 1).getDay();
        let totalDays = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
        let events = JSON.parse(localStorage.getItem("events")) || {};

        for (let i = 0; i < firstDay; i++) {
            let emptyDiv = document.createElement("div");
            emptyDiv.classList.add("empty");
            calendarDays.appendChild(emptyDiv);
        }

        for (let day = 1; day <= totalDays; day++) {
            let dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.textContent = day;
            let dateKey = `${currentYear}-${currentMonthIndex + 1}-${day}`;

            if (events[dateKey]) {
                dayDiv.style.background = "lightgreen";
            }

            dayDiv.addEventListener("click", () => {
                document.querySelectorAll(".day").forEach(d => d.classList.remove("selected"));
                dayDiv.classList.add("selected");
                selectedDate = new Date(currentYear, currentMonthIndex, day);
                editEventButton.disabled = false;
            });

            calendarDays.appendChild(dayDiv);
        }
    }

    prevMonthButton.addEventListener("click", () => {
        currentMonthIndex--;
        if (currentMonthIndex < 0) {
            currentMonthIndex = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthButton.addEventListener("click", () => {
        currentMonthIndex++;
        if (currentMonthIndex > 11) {
            currentMonthIndex = 0;
            currentYear++;
        }
        renderCalendar();
    });

    addEventButton.addEventListener("click", () => {
        if (!selectedDate) return;
        addEventModal.style.display = "flex";
    });

    editEventButton.addEventListener("click", () => {
        if (!selectedDate || !events[selectedDate]) return;
        editEventModal.style.display = "flex";
    });

    closeAddModal.addEventListener("click", () => {
        addEventModal.style.display = "none";
    });

    closeEditModal.addEventListener("click", () => {
        editEventModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === addEventModal) {
            addEventModal.style.display = "none";
        }
        if (event.target === editEventModal) {
            editEventModal.style.display = "none";
        }
    });

    renderCalendar();
});

const eventColors = {
    "School Event": "pink",
    "Quiz/Exam": "red",
    "Activities/Projects": "yellow"
};

function saveEvent() {
    if (!selectedDate) {
        alert("Please select a date first.");
        return;
    }

    const eventName = document.getElementById("eventTitle").value;
    const eventType = document.getElementById("eventType").value;

    if (!eventName || !eventType) {
        alert("Please enter an event name and type.");
        return;
    }

    // Get existing events or create a new object
    let events = JSON.parse(localStorage.getItem("events")) || {};

    // Save the new event
    events[selectedDate] = {
        name: eventName,
        type: eventType
    };

    localStorage.setItem("events", JSON.stringify(events));

    // Update UI
    renderCalendar();
    updateUpcomingEvents();

    // Close modal
    document.getElementById("addEventModal").style.display = "none";

    console.log("Event saved successfully:", events); // Debugging log
}


    function updateUpcomingEvents() {
        const eventList = document.getElementById("eventList");
        eventList.innerHTML = ""; // Clear the list
    
        let events = JSON.parse(localStorage.getItem("events")) || {};
        let sortedDates = Object.keys(events).sort((a, b) => new Date(a) - new Date(b));
    
        sortedDates.forEach(date => {
            let event = events[date];
            let eventItem = document.createElement("li");
            eventItem.innerHTML = `<strong>${event.name}</strong> (${event.type}) - ${date}`;
            eventList.appendChild(eventItem);
        });
    }    

    // Create event object
    const newEvent = {
        name: eventName,
        type: eventType,
        description: eventDescription,
        timeStart: eventTimeStart,
        timeEnd: eventTimeEnd,
        location: eventLocation,
        availability: eventAvailability
    };

    // Save in localStorage
    let events = JSON.parse(localStorage.getItem("events")) || {};
    events[selectedDate] = newEvent;
    localStorage.setItem("events", JSON.stringify(events));

    // Update UI
    renderCalendar();
    updateUpcomingEvents();

    // Close modal
    document.getElementById("addEventModal").style.display = "none";




