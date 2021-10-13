export default class ChartsStores {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    async init() {
    }

    async retrieveAnswersByActors(id, actor) {
        const {PhaseTwoStore} = this.rootStore;
        const answers = await PhaseTwoStore.getActorsAnswers(id, actor);
        const anwsersList = answers.map(answer => {

            return {
                question: answer.question_id,
                actor: answer.actor,
                value: answer.value,
            }
        })

        return anwsersList;
    }

    async retrieveFacilitatorComments(id) {
        const {PhaseTwoStore} = this.rootStore;
        const facilitatorAnswers = await PhaseTwoStore.getFacilitatorAnswers(id);
        const faAnswers = facilitatorAnswers.map(answer => {
            return {
                question: answer.question_id,
                actor: answer.actor,
                value: answer.value,
            }
        })
        return faAnswers;
    }

    async answersPerQuestion(id, totalAnswers) {
        const {PhaseTwoStore, UIStore} = this.rootStore;
        const allQuestions = await PhaseTwoStore.getQuestions(id);
        const questions = await PhaseTwoStore.getOnlyParentQuestions(id);
        const data = [];

        for (const question of questions) {
            const line = {
                label: "",
                question: "",
                score: [],
                section: question.section,
                mean: 0,
                sDev: 0
            };

            line.label = `${question.section}.${question.order}`;
            line.question = question.name;

            const childrenQuestions = allQuestions.filter(q => {
                return q.question_question === question.question;
            })

            Object.entries(totalAnswers).forEach(answers => {
                let sumValues = 0;
                let totalScore = 0;
                answers[1].forEach(answer => {
                    for (const child of childrenQuestions) {

                        if (parseInt(answer.question) === parseInt(child.question)) {
                            const value = answer.value
                            sumValues += parseInt(answer.value);
                            totalScore += parseInt(value) * parseInt(child.value)
                        }
                    }
                })

                const calculatedScore = UIStore.calculateScore(totalScore, sumValues);
                line.score.push({actor: answers[0], score: calculatedScore})
            })

            //Calculate mean
            line.mean = line.score.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.score
            }, 0) / line.score.length
            line.mean = UIStore.roundByTwo(line.mean);

            //Calculate stDev
            const stDev = line.score.map(i => i.score);
            line.stDev = UIStore.roundByTwo(UIStore.dev(stDev));

            data.push({line})
        }

        return data;
    }

    async collectDataForCharts(app_id){
        const {PhaseTwoStore} = this.rootStore;
        const totalAnswers =[];
        const actors = await PhaseTwoStore.getActors(app_id);
        let keys = 10;
        for (const actor of actors) {
            keys++;
            const answersList = await this.retrieveAnswersByActors(app_id, actor.id)
            totalAnswers[actor.id] = answersList;
        }

        const faAnswers = await this.retrieveFacilitatorComments(app_id)


        return await this.answersPerQuestion(app_id, totalAnswers);
    }


}