//  Query the canvas element for animation
const canvas = document.querySelector("canvas");
//  Establish the working context as the X / Y plane
const context = canvas.getContext("2d");
//  Bring in an interface to handle the properties of our wave
const gui = new dat.GUI();

//  Declare our canvas dimensions as to be the maximum within its parent element
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.middle = innerHeight / 2;

// Defining our wave's original properties
const wave = {
  y: canvas.middle,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01,
};

// Adding the GUI controlls to our wave's animation, with minimum and maximum values as 3rd and 4th arguments
gui.add(wave, "y", canvas.middle - 100, canvas.middle + 100);
gui.add(wave, "length", -0.01, 0);
gui.add(wave, "amplitude", 0, 300);
gui.add(wave, "frequency", -1, 1);

// The rate of horizontal shift our wave undergoes per frame rate
let increment = wave.frequency;

// The process of animation
const animate = () => {
  requestAnimationFrame(animate);

  // To prevent the wave remaining every frame, we must clear the canvas every frame
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Initialize the path which we want to draw on
  context.beginPath();

  // Start the path from X = 0, Y = (canvas height / 2)
  context.moveTo(0, canvas.height / 2);

  // for the length of the canvas...
  for (let i = 0; i < canvas.width; i++) {
    // Set path as a point on (X = i, Y = [sine function] * amplitude (height)) per each unit measurement of canvas width
    context.lineTo(
      i,
      wave.y + Math.sin(i * wave.length + increment) * wave.amplitude
    );
  }
  // Create the stroke on the path (default black, 1px)
  context.stroke();
  // Set the increment (lateral shift over time) as accumulative to allow for updates
  increment += wave.frequency;
};

// Call the animation
animate();
