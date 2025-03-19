<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event | EduFlow</title>
    <link rel="stylesheet" href="events.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <script src="events.js" defer></script>
</head>
<body>

<!-- Top Navigation Bar -->
<div class="top-nav">
    <!-- Left Section: EduFlow Logo -->
    <div class="nav-left">
        <img src="images/edu.PNG" alt="EduFlow Logo" class="logo-placeholder">
    </div>

    <!-- Right Section: Time, Date, Profile Picture -->
    <div class="nav-right">
        <span id="current-time"></span>
        <span id="current-date"></span>
    </div>
</div>

<script>
        function updateTime() {
            const now = new Date();
            document.getElementById('current-time').textContent = now.toLocaleTimeString();
            document.getElementById('current-date').textContent = now.toLocaleDateString(undefined, { 
                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' 
            });
        }
        setInterval(updateTime, 1000);
        updateTime();
    </script>

    <!-- Sidebar -->
<aside class="sidebar">
    <div class="logo">
        <i class="fas fa-bars menu-icon" id="menuToggle"></i>
    </div>
    <nav class="menu">
        <a href="dashboard.php">
            <i class="fas fa-home"></i>
            <span class="menu-text">Dashboard</span>
        </a>

        <!-- Productivity Tools Dropdown (No Icon, Clickable Entirely) -->
        <div class="dropdown">
            <a href="#" id="productivityTools">
                <i class="fas fa-calendar"></i>
                <span class="menu-text">Productivity Tools</span>
            </a>
            <div class="dropdown-menu">
                <a href="notes.php"><i class="fas fa-sticky-note"></i> <span class="menu-text">Notes</span></a>
                <a href="tasks.php"><i class="fas fa-tasks"></i> <span class="menu-text">Task</span></a>
                <a href="events.php"><i class="fas fa-calendar-alt"></i> <span class="menu-text">Event</span></a>
                <a href="progress.php"><i class="fas fa-chart-line"></i> <span class="menu-text">Progress</span></a>
            </div>
        </div>

        <a href="profile.php">
            <i class="fas fa-user"></i>
            <span class="menu-text">Profile</span>
        </a>
        <a href="about.php">
            <i class="fas fa-info-circle"></i>
            <span class="menu-text">About</span>
        </a>
        <a href="feedback.php">
            <i class="fas fa-comment"></i>
            <span class="menu-text">Feedback</span>
        </a>
        <a href="logout.php" class="logout">
            <i class="fas fa-sign-out-alt"></i>
            <span class="menu-text">Logout</span>
        </a>
    </nav>
</aside>

<!-- Header -->
<div class="container">
        <h1 class="header">Event</h1>

        <div class="event-wrapper">
            <!-- Left Section -->
            <div class="left-panel">
                <!-- Upcoming Events Panel -->
                <div class="upcoming-events">
                    <h3>Upcoming Events</h3>
                    <ul id="eventList"></ul>
                </div>

                <!-- Legend Panel -->
                <div class="legend">
                    <h3>Legend</h3>
                    <ul>
                        <li><span class="legend-circle school"></span> School Event</li>
                        <li><span class="legend-circle quiz"></span> Quiz/Exam</li>
                        <li><span class="legend-circle project"></span> Activities/Projects</li>
                    </ul>
                </div>
            </div>

            <!-- Calendar Section -->
            <div class="calendar-container">
                <h2 id="currentMonth"></h2>
                <div class="weekdays">
                    <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                </div>
                <div id="calendarDays" class="days"></div>
                <div class="calendar-buttons">
                    <button id="prevMonth">Go to Previous Month</button>
                    <button id="addEvent">Add</button>
                    <button id="editEvent" disabled>Edit</button>
                    <button id="nextMonth">Go to Next Month</button>
                </div>
            </div>
        </div>
    </div>

    <div id="addEventModal" class="modal">
        <div class="modal-content">
            <h2>Add an Event</h2>
            <label>Title:</label>
            <input type="text" id="eventTitle">
            <label>Type:</label>
            <select id="eventType">
                <option>Birthday</option>
                <option>School Event</option>
                <option>Activities/Projects</option>
            </select>
            <label>Description:</label>
            <textarea id="eventDescription"></textarea>
            <label>Time:</label>
            <input type="time" id="eventStart"> to 
            <input type="time" id="eventEnd">
            <label>Location:</label>
            <input type="text" id="eventLocation">
            <label>Availability:</label>
            <select id="eventAvailability">
                <option>Busy</option>
                <option>Free</option>
            </select>
            <button id="saveEventButton" onclick="saveEvent()">Save</button>
            <button id="closeAddModal">Cancel</button>
        </div>
    </div>

    <!-- Edit Event Modal -->
    <div id="editEventModal" class="modal">
        <div class="modal-content">
            <h2>Edit Event</h2>
            <label>Title:</label>
            <input type="text" id="editTitle">
            <label>Type:</label>
            <select id="editType">
                <option>Birthday</option>
                <option>School Event</option>
                <option>Activities/Projects</option>
            </select>
            <label>Description:</label>
            <textarea id="editDescription"></textarea>
            <label>Time:</label>
            <input type="time" id="editStart"> to 
            <input type="time" id="editEnd">
            <label>Location:</label>
            <input type="text" id="editLocation">
            <label>Availability:</label>
            <select id="editAvailability">
                <option>Busy</option>
                <option>Free</option>
            </select>
            <button id="updateEvent">Update</button>
            <button id="closeEditModal">Cancel</button>
        </div>
    </div>
</div>
</body>
</html>