import { ProblemTypeKeys } from "../../../data/constants/problem";


class ReactStateParser{
    constructor(problemSate){
        this.problemSate = problemSate
    }
    parseQuestion() {
        let question = this.problemSate.question;
        let paresedQuestion = this.splitLines(question);
        let parsedString = '';
        for (const line in paresedQuestion) {
            let replacedString = paresedQuestion[i].replace("<p>", ">>").replace("</p>", "<<");
            parsedString += `${replacedString}\n`
        }
        return parsedString;
    }

    parseHints() {
        let hintString = '';
        let hitnsList = this.problemSate.hints;
        for (const hint in hitnsList){
            hintString += `||${hitnsList[hint]}||\n`;
        }
        return hintString
    }

    parseDropdown(){
        let answerString = '';
        let answers = this.problemSate.answers;
        for (const answer in answers){
            let answerObject = answers[answer];
            let answerContent = answerObject.title;
            let answerFeedback = answerObject?.feedback;
            if (answerObject.correct) {
                answerString += ` (${answerContent})`
            } else {
                answerString += ` ${answerContent}`
            }
            if (answerFeedback !== '' || answerFeedback !== undefined){
                answerString += ` {{${answerFeedback}}}`
            }
        }
        answerString = `[[${answerString}]]\n`;
        return answerString;
    }

    parseCheckBox(){
        let anwerString = '';
        let answers = this.problemSate.answers;
        for (const answer in answers){
            let answerObject = answers[answer];
            let answerContent = answerObject.title;
            let answerSelectedFeedback = answerObject?.selectedFeedback;
            let answerUnselectedFeedback = answerObject?.unselectedFeedback;
            let isSelectedFeedbackPresent = (answerSelectedFeedback !== '' || answerSelectedFeedback !== undefined);
            let isUnselectedFeedbackPresent = (answerUnselectedFeedback !== '' || answerUnselectedFeedback !== undefined);
            if (answerObject.correct) {
                anwerString += ` [x] ${answerContent}`
            } else {
                anwerString += ` [ ] ${answerContent}`
            }
            if (isSelectedFeedbackPresent && isUnselectedFeedbackPresent){
                anwerString += `{{selected: ${answerSelectedFeedback}},{unselected: ${answerUnselectedFeedback}}}\n`
            } else if (isSelectedFeedbackPresent) {
                anwerString += `{{selected: ${answerSelectedFeedback}}}\n`
            } else if (isUnselectedFeedbackPresent) {
                anwerString += `{{unselected: ${answerUnselectedFeedback}}}\n`
            }
            anwerString += "\n";
        }
        return anwerString;
    }


    parseRadioButton(){
        let answerString = '';
        let answers = this.problemSate.answers;
        for (const answer in answers){
            let answerObject = answers[answer];
            let answerContent = answerObject.title;
            let answerFeedback = answerObject?.feedback;
            if (answerObject.correct) {
                answerString += `(x) ${answerContent}`;
            } else {
                answerString += `( ) ${answerContent}`;
            }
            if (answerFeedback !== '' || answerFeedback !== undefined){
                answerString += ` {{${answerFeedback}}}`;
            }
            answerString += `${answerString}\n`;
        }
        return answerString;
    }

    getMarkdown() {
        let answers = ''
        switch (this.problemSate.problemType) {
            case ProblemTypeKeys.DROPDOWN:
                answers = this.parseDropdown();
                break;
            case ProblemTypeKeys.MULTISELECT:
                answers = this.parseCheckBox();
                break;
            case ProblemTypeKeys.SINGLESELECT:
                answers = this.parseRadioButton();
                break;

            default:
                break;
        }
        let markdown = `${this.parseQuestion()}
                        ${answers}
                        ${this.parseHints()}
                        `
    }

    splitLines(inputString){
        return inputString.trim().split("\n");
    }
}
