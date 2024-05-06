let questions = [
  {
    id: 1,
    level_id: 1,
    question: "Ո՞վ է գրել «Աստվածային կատակերգությունը»",
    answer: [
      {id: 1, label: "Դանթե Ալիգիերի"},
      {id: 2, label: "Հոմերոս"},
      {id: 3, label: "Գյոթե"},
      {id: 4, label: "Դանիել Համբարձումյան"}

    ],
    current: 1
  },
  {
    id: 2,
    level_id: 2,
    question: "Նշվածներից ո՞րը աշխարհի 7 հրաշալիքներից ՉԷ․",
    answer: [
      {id: 1, label: "Թաջ Մահալ"},
      {id: 2, label: "Զևսի արձանը"},
      {id: 3, label: "Քեոփսի արձան"},
      {id: 4, label: "Արտեմիսի տաճար"}

    ],
    current: 1
  },
  {
    id: 3,
    level_id: 3,
    question: "Ո՞ր թվականին է տեղի ունեցել մարդու առաջին թռիչքը դեպի Տիեզերք․",
    answer: [
      {id: 1, label: "1951"},
      {id: 2, label: "1941"},
      {id: 3, label: "1961"},
      {id: 4, label: "2021"}
    ],
    current: 3,
  },
  {
    id: 4,
    level_id: 3,
    question: "Քանի՞ տարր կա Մենդելեևի պարբերական համակարգում:",
    answer: [
      {id: 1, label: "103"},
      {id: 2, label: "33"},
      {id: 3, label: "118"},
      {id: 4, label: "128"}

    ],
    current: 3,
  },
  {
    id: 5,
    level_id: 5,
    question: "Եթե խառնեք կապույտն ու դեղինը, ի՞նչ կստացվի․",
    answer: [

      {id: 1, label: "կարմիր"},
      {id: 2, label: "կանաչ"},
      {id: 3, label: "դեղին"},
      {id: 4, label: "մանուշակագույն"}
    ],
    current: 2,
  },
  {
    id: 5,
    level_id: 5,
    question: "Որտե՞ղ է գտնվում ուղղափառության կենտրոնը․",
    answer: [
      {id: 1, label: "Հռոմ"},
      {id: 2, label: "Էջմիածին"},
      {id: 3, label: "Վենետիկ"},
      {id: 4, label: "Կոստանդնուպոլիս"},
    ],
    current: 4,
  },

  {
    id: 6,
    level_id: 4,
    question: "Նոտաների հերթականությունը Դո-ից մինչև հաջորդ Դո կոչվում է․",
    answer: [
      {id: 1, label: "Օկտավա"},
      {id: 2, label: "Տերցիա"},
      {id: 3, label: "Ակորդ"},
      {id: 4, label: "Անտոնիա"},
    ],
    current: 1,
  },
  {
    id: 7,
    level_id: 2,
    question: "Ո՞ր թվականին է ընդունվել ԱՄՆ անկախության հռչակագիրը․",
    answer: [
      {id: 1, label: "1639"},
      {id: 2, label: "1490"},
      {id: 3, label: "2024"},
      {id: 4, label: "1776"}
    ],
    current: 4,
  }
];

  let pyramidset = [
    {
      id: 1,
      price: 500,
      status: false
    },
    {
      id: 2,
      price: 2000,
      status: false
    },
    {
      id: 3,
      price: 4000,
      status: false
    },
    {
      id: 4,
      price: 8000,
      status: false
    },
    {
      id: 5,
      price: 16000,
      status: false
    },
    {
      id: 6,
      price: 25000,
      status: false
    },
    {
      id: 7,
      price: 64000,
      status: false
    },
    {
      id: 8,
      price: 100000,
      status: false
    },
    {
      id: 9,
      price: 250000,
      status: false
    },
    {
      id: 10,
      price: 500000,
      status: false
    },
  ]


let priceUl=document.querySelector(".priceUl")

let questionIndex = 0
let answerResult = false
let score = {
  success: 0,
  wrong: 0
}

function priceSettings() {
  priceUl.innerHTML = ""
  pyramidset = pyramidset.map(res => {
    if (res.id === questionIndex) {
      res.status = true
    }
    return res
  })


  pyramidset.forEach(res => {
    priceUl.insertAdjacentHTML("afterbegin",`
    <li data-id="${res.id}" class="${res.status && "active"}"> ${res.price}</li>
  `)
  })
}

function next() {
  questionIndex++
  if (!answerResult && questionIndex > 1) {
    alert("չկա պատասխան ")
    return false
  }
  answerResult = false

  let result = questions.filter((res => res.level_id === questionIndex)
  )
  result = result[Math.floor(Math.random() * result.length)]
  answerResult = null
  if (!result) {
    gameOver()
    return
  }
  viewPrint(result)
  priceSettings()
}


function viewPrint(data) {
  let question_field = document.querySelector(".question_field")
  let answer_field = document.querySelector(".answer_field")
  question_field.innerHTML = data.question
  answer_field.innerHTML = ""
  data.answer.forEach(val => {
    answer_field.innerHTML += `<li data-id="${val.id}">${val.label}</li>`
  })
  console.log(data)

  let answer_list_field = document.querySelectorAll(".answer_field li")
  answer_list_field.forEach(liTag => {
    liTag.addEventListener("click", function () {
      if (!answerResult) {
        if (+liTag.dataset.id === data.current) {
          liTag.style.background = "green"
          score.success++
        } else {
          liTag.style.background = "red"
         score.wrong++

        }

        answerResult = true
      }

    })
  })

}

function gameOver() {
  let scoreRes = document.querySelector(".score")
  scoreRes.innerHTML = `
  <ul>
  <li>success:${score.success}</li>
  <li>wrong:${score.wrong}</li>
</ul>
<button onclick="startnow()">Start Now</button>
`

}
  next()
priceSettings()
function startnow(){
  questionIndex=0
  answerResult=0
  score.wrong=0
  score.success=0
  let result=document.querySelector(".result")
  result.classList.add("d-none")
  next()
}
