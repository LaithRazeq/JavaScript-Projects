const correctAnswers = ['C', 'C', 'A', 'C', 'C']; //Form correct answers


const form = document.querySelector('.quiz-form'); //reference to the form
const result = document.querySelector('.result'); //reference to the results div
// const span = document.querySelector('span'); //Method 2

form.addEventListener('submit', e => {
    e.preventDefault();

    let score = 0; //user score
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value]; //user submitted answers

    // Check Answers
    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            score += 20;
        }
    });

    // Scrolling to the top automatically to see results
    scrollTo(0, 0);

    // Show result on page
    // result.querySelector('span').textContent = `${score}%`; //Method 1
    // span.textContent = `${score}%`; //Method 2
    result.classList.remove('d-none'); //Removing bootstrap class that blocks display



    // Animating the result score 
    let output = 0; //New result display
    const timer = setInterval(() => { //Creating an interval that counts up the score
        result.querySelector('span').textContent = `${output}%`;
        if (output === score) {
            clearInterval(timer); //stop the interval
        } else {
            output++;
        }
    }, 20); //Add one to the result score every 20ms
});