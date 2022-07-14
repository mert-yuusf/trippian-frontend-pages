import {FaqQuestions} from "./accordionFAQ-data.js";

const setClassOfCategory = (question)=>{
    if(question.category === "Live Map"){
        return "bg-primary";
    }else if(question.category === "General"){
        return "bg-dark"
    }
}

const displayQuestions = (questions)=>{
    const accordionFAQ = document.querySelector("#accordionFAQ");
    accordionFAQ.innerHTML = "";
    accordionFAQ.innerHTML = questions.map(question => {
        return `<div class="accordion-item">
    <h2 class="accordion-header" id="heading-${question.id}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${question.id}" aria-expanded="true" aria-controls="collapse-${question.id}">
        <span class="me-3 p-2 badge ${setClassOfCategory(question)}">${question.category}</span>
        <span>${question.question}</span>
      </button>
    </h2>
    <div id="collapse-${question.id}" class="accordion-collapse collapse" aria-labelledby="heading-${question.id}" data-bs-parent="#accordionFAQ">
      <div class="accordion-body">
        ${question.answer}
      </div>
    </div>
  </div>`
    }).join(" ");
}



const searchForm = document.querySelector("#search-form");
displayQuestions(FaqQuestions);
setInterval(()=>{
    const query = document.querySelector("#query").value;
    if(query!== "" && query.length >= 3){
        const questions = FaqQuestions.filter(question => {
            return question.answer.toLowerCase().includes(query.toLowerCase())
                || question.category.toLowerCase().includes(query.toLowerCase())
                || question.question.toLowerCase().includes(query.toLowerCase());
        });
        displayQuestions(questions);
    }else{
        displayQuestions(FaqQuestions);
    }
},1000);
