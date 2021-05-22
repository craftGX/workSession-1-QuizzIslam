//
// lib/lib.js
//
var Question = function (questionObj) {
    this.value = {
      text: "Question",
      answers: []
    };
  
    this.selectedAnswer = null;
    this.html = null;
    this.questionText = null;
    this.questionAnswers = null;
    this.questionFeedback = null;
  
    this.value = Object.assign(this.value, questionObj);
  
    this.onQuestionAnswered = ({ detail }) => {
      this.selectedAnswer = {
        value: detail.answer,
        html: detail.answerHtml
      };
      this.update();
  
      document.dispatchEvent(
        new CustomEvent("question-answered", {
          detail: {
            question: this,
            answer: detail.answer
          }
        })
      );
    };
  
    this.create = function () {
      this.html = document.createElement("div");
      this.html.classList.add("question");
  
      this.questionText = document.createElement("h2");
      this.questionText.textContent = this.value.text;
  
      this.questionAnswers = document.createElement("div");
      this.questionAnswers.classList.add("answers");
  
      for (let i = 0; i < this.value.answers.length; i++) {
        const ansObj = this.value.answers[i];
        let answer = createAnswer(ansObj);
  
        answer.onclick = (ev) => {
          if (this.selectedAnswer !== null) {
            this.selectedAnswer.html.classList.remove("selected");
          }
  
          answer.classList.add("selected");
  
          this.html.dispatchEvent(
            new CustomEvent("question-answered", {
              detail: {
                answer: ansObj,
                answerHtml: answer
              }
            })
          );
        };
  
        this.questionAnswers.appendChild(answer);
      }
  
      this.questionFeedback = document.createElement("div");
      this.questionFeedback.classList.add("question-feedback");
  
      this.html.appendChild(this.questionText);
      this.html.appendChild(this.questionAnswers);
      this.html.appendChild(this.questionFeedback);
  
      this.html.addEventListener("question-answered", this.onQuestionAnswered);
  
      return this.html;
    };
  
    this.disable = function () {
      this.html.classList.add("disabled");
      this.html.onclick = (ev) => {
        ev.stopPropagation();
      };
  
      this.html.removeEventListener("question-answered", this.onQuestionAnswered);
  
      let answers = this.html.querySelectorAll(".answer");
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        answer.onclick = null;
      }
    };
  
    this.remove = function () {
      let children = this.html.querySelectorAll("*");
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        this.html.removeChild(child);
      }
  
      this.html.removeEventListener("question-answered", this.onQuestionAnswered);
  
      this.html.parentNode.removeChild(this.html);
      this.html = null;
    };
  
    this.update = function () {
      let correctFeedback, incorrectFeedback;
      this.html = this.html || document.createElement("div");
  
      correctFeedback = "Bonne réponse !!!";
      incorrectFeedback = "Oups!!!Tu t'es trompé...";
  
      if (this.selectedAnswer !== null) {
        if (this.selectedAnswer.value.isCorrect) {
          this.html.classList.add("correct");
          this.html.classList.remove("incorrect");
          this.questionFeedback.innerHTML = correctFeedback;
        } else {
          this.html.classList.add("incorrect");
          this.html.classList.remove("correct");
          this.questionFeedback.innerHTML = incorrectFeedback;
        }
      }
    };
  
    function createAnswer(obj) {
      this.value = {
        text: "Answer",
        isCorrect: false
      };
  
      this.value = Object.assign(this.value, obj);
  
      this.html = document.createElement("button");
      this.html.classList.add("answer");
  
      this.html.textContent = this.value.text;
  
      return this.html;
    }
  };
  
  //
  // main.js
  //
  
  let questionsData = [
    {
      text: "Qui est le dernier prophète de l'islam?",
      answers: [
        {
          text: "Jésus",
          isCorrect: false
        },
        {
            text: "Abu Lahab",
            isCorrect: false
          },
        {
          text: "Muhammad(saws)",
          isCorrect: true
        },
        {
          text: "Batman",
          isCorrect: false
        }
      ]
    },
    {
        text: "Comment s'appelle l'oncle du prophète Muhammad(saws) qui l'a toujours soutenu contre Quraysh?",
        answers: [
          {
            text: "Abu Lahab",
            isCorrect: false
          },
          {
              text: "Abu Harissa",
              isCorrect: false
            },
          {
            text: "Abu Talib",
            isCorrect: true
          },
          {
            text: "Abu Soufiane",
            isCorrect: false
          }
        ]
      },
      {
        text: "Qui étatit le 3ème calife de l'islam?",
        answers: [
          {
            text: "Abu Bakr aS-Siddiq",
            isCorrect: false
          },
          {
            text: "Abu Bakr al-Baghdadi",
            isCorrect: false
          },
          {
            text: "Outhmmane ibn Affane",
            isCorrect: true
          },
          {
            text: "Ali ibn Talib",
            isCorrect: false
          }
        ]
      },
      {
        text: "Sur quoi se base-t-on sur le dogme islamique?",
        answers: [
          {
            text: "Les lois de la République",
            isCorrect: false
          },
          {
              text: "Les livres sataniques",
              isCorrect: false
            },
          {
            text: "Le Coran et la Sunna",
            isCorrect: true
          },
          {
            text: "Le Coran seulement",
            isCorrect: false
          }
        ]
      },
      {
        text: "Combien Allah possède-t-il de noms?",
        answers: [
          {
            text: "59",
            isCorrect: false
          },
          {
              text: "19",
              isCorrect: false
            },
          {
            text: "99",
            isCorrect: true
          },
          {
            text: "9",
            isCorrect: false
          }
        ]
      },
      {
        text: "Que signifie < La ilaha illa Allah > ?",
        answers: [
          {
            text: "Allah est le maitre de l'univers",
            isCorrect: false
          },
          {
              text: "Allah est notre créateur unique",
              isCorrect: false
            },
          {
            text: "Nul n'est digne d'etre adoré en dehors d'Allah",
            isCorrect: true
          },
          {
            text: "Allah est Dieu",
            isCorrect: false
          }
        ]
      },
      {
        text: "Qu'est ce qui annule ta foi en Allah?",
        answers: [
          {
            text: "Boire de l'alcool,fumer,mentir,écouter de la musique",
            isCorrect: false
          },
          {
              text: "Raser sa barbe,mettre un jean et des baskets",
              isCorrect: false
            },
          {
            text: "Invoquer des djinns,Prier Satan,Faire de la magie,Sacrifier un animal pour un djinn",
            isCorrect: true
          },
          {
            text: "Regarder la tv et jouer au tennis",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quel est le 1er verset à avoir été révelé au prophète Muhammad(saws)?",
        answers: [
          {
            text: "verset1 sourate al Fatiha",
            isCorrect: false
          },
          {
              text: "tu ne tuera point !",
              isCorrect: false
            },
          {
            text: "verset1 sourate96 'Lis au nom de ton Seigneur qui a crée",
            isCorrect: true
          },
          {
            text: "Mon nom à moi c'est Benny-B",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quels sont les 2 livres les plus authentiques de Hadith?",
        answers: [
          {
            text: "Bukhari et al-Musnad",
            isCorrect: false
          },
          {
              text: "Bukhari et al-Bayhaqi",
              isCorrect: false
            },
          {
            text: "Bukhari et Mouslim",
            isCorrect: true
          },
          {
            text: "Manu et Gérard",
            isCorrect: false
          }
        ]
      },
      {
        text: "Combien y-a-t-il de mois sacrés dans le calendrier islamique?",
        answers: [
          {
            text: "3",
            isCorrect: false
          },
          {
              text: "2",
              isCorrect: false
            },
          {
            text: "4",
            isCorrect: true
          },
          {
            text: "Ils sont tous sacrés !",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quelle est la 1ère victoire de l'armée musulmane?",
        answers: [
          {
            text: "Les Coalisés",
            isCorrect: false
          },
          {
              text: "1ère guerre mondiale",
              isCorrect: false
            },
          {
            text: "Badr",
            isCorrect: true
          },
          {
            text: "Uhud",
            isCorrect: false
          }
        ]
      },
      {
        text: "Où s'effectue le Hajj?",
        answers: [
          {
            text: "à Agadir",
            isCorrect: false
          },
          {
              text: "à Lourdes",
              isCorrect: false
            },
          {
            text: "à la Mecque",
            isCorrect: true
          },
          {
            text: "à Médine",
            isCorrect: false
          }
        ]
      },
      {
        text: "Lequel n'est pas une secte de l'islam?",
        answers: [
          {
            text: "les frères musulmans",
            isCorrect: false
          },
          {
              text: "Soufi",
              isCorrect: false
            },
          {
            text: "Sunnite",
            isCorrect: true
          },
          {
            text: "Ach'arites",
            isCorrect: false
          }
        ]
      },
      {
        text: "Où le musulman doit-il se diriger pour effectuer ses prières quotidiennes?",
        answers: [
          {
            text: "la tombe de Omar(Médine)",
            isCorrect: false
          },
          {
              text: "al Quds(Jérusalem)",
              isCorrect: false
            },
          {
            text: "la Ka'ba(la Mecque)",
            isCorrect: true
          },
          {
            text: "la tombe de abd'al Qadir",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quels sont les élements qui font partie de la Foi?",
        answers: [
          {
            text: "Croyance en Allah et en ses livres",
            isCorrect: false
          },
          {
              text: "Croyance au destin et aux Anges",
              isCorrect: false
            },
          {
            text: "toutes les réponses sont bonnes !",
            isCorrect: true
          },
          {
            text: "Croyances aux prophètes et au jour du jugement dernier",
            isCorrect: false
          }
        ]
      },
      {
        text: "Qui est l'ange chargé de la révélation Coranique?",
        answers: [
          {
            text: "Malik",
            isCorrect: false
          },
          {
              text: "Mickael",
              isCorrect: false
            },
          {
            text: "Jibril",
            isCorrect: true
          },
          {
            text: "Nakir",
            isCorrect: false
          }
        ]
      },
    {
      text: "Y-a-t-il un chatiment de la Tombe?",
      answers: [
        {
          text: "oui",
          isCorrect: true
        },
        {
          text: "non",
          isCorrect: false
        }
        
      ]
    },
    {
      text: "Combien y-a-t-il de prières obligatoires dans la journée?",
      answers: [
        {
          text: "10",
          isCorrect: false
        },
        {
          text: "50",
          isCorrect: false
        },
        {
          text: "5",
          isCorrect: true
        }
      ]
    },
    {
      text: "Que veut dire Islam ?",
      answers: [
        {
          text: "Paix,Soumission et Obéissance à Allah",
          isCorrect: true
        },
        {
          text: "Obéir aux lois de la République",
          isCorrect: false
        },
        {
          text: "DAESH",
          isCorrect: false
        },
        {
          text: "Fais ce que tu veux ",
          isCorrect: false
        }
      ]
    },
    {
      text: "Qu'est ce que la Zakat?",
      answers: [
        {
          text: "3ème pilier de l'Islam,Aumone obligatoire",
          isCorrect: true
        },
        {
          text: "Sacrifice rituelle",
          isCorrect: false
        },
        {
          text: "Danser le twerk",
          isCorrect: true
        },
        {
          text: "Aumone non-obligatoire pour les riches",
          isCorrect: false
        }
      ]
    }
  ];
  
  // variables initialization
  let questions = [];
  let score = 0,
    answeredQuestions = 0;
  let appContainer = document.getElementById("questions-container");
  let scoreContainer = document.getElementById("score-container");
  scoreContainer.innerHTML = `Score: ${score}/${questionsData.length}`;
  
  /**
   * Shuffles array in place. ES6 version
   * @param {Array} arr items An array containing the items.
   */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  shuffle(questionsData);
  
  // creating questions
  for (var i = 0; i < questionsData.length; i++) {
    let question = new Question({
      text: questionsData[i].text,
      answers: questionsData[i].answers
    });
  
    appContainer.appendChild(question.create());
    questions.push(question);
  }
  
  document.addEventListener("question-answered", ({ detail }) => {
    if (detail.answer.isCorrect) {
      score++;
    }
  
    answeredQuestions++;
    scoreContainer.innerHTML = `Score: ${score}/${questions.length}`;
    detail.question.disable();
  
    if (answeredQuestions == questions.length) {
      setTimeout(function () {
        alert(`Quiz completed! \nFinal score: ${score}/${questions.length} \nBy StefoufouAndCo`);
      }, 100);
    }
  });
  
  console.log(questions, questionsData);