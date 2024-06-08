function openNav() {
    const sidebarWidth = "125px";
    document.getElementById("mySidenav").style.width = sidebarWidth;
    const dynamicText = document.getElementById("dynamic-text");
    const newLeftPosition = window.innerWidth >= 600 ? sidebarWidth : "150px"; // Adjust the position based on sidebar width and screen size
    dynamicText.style.left = newLeftPosition;
    dynamicText.style.transform = "translateY(-50%)"; // Ensure vertical alignment remains centered
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("dynamic-text").style.left = "70px"; // Reset to the original position
    document.getElementById("dynamic-text").style.transform = "translateY(-50%)"; // Ensure vertical alignment remains centered
}

