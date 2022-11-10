import { useState, useEffect } from 'react';

import * as module from './hooks';
import messages from './messages';
import { actions } from '../../../../../data/redux';
import _ from 'lodash-es';

export const state = {
    showAdvanced: (val) => useState(val),
    cardCollapsed: (val) => useState(val),
    summary: (val) => useState(val),
};

export const showAdvancedSettingsCards = () => {
    const [isAdvancedCardsVisible, setIsAdvancedCardsVisible] = module.state.showAdvanced(false);
    return {
        isAdvancedCardsVisible,
        showAdvancedCards: () => setIsAdvancedCardsVisible(true),
    };
}

export const showFullCard = () => {
    const [isCardCollapsed, setIsCardCollapsed] = module.state.cardCollapsed(false);
    return {
        isCardCollapsed,
        toggleCardCollapse: () => setIsCardCollapsed(!isCardCollapsed),
    };
}

export const hintsCardHooks = (hints, updateSettings) => {
    const [summary, setSummary] = module.state.summary({ message: messages.noHintSummary, values: {} })

    useEffect(() => {
        const hintsNumber = hints.length;
        if (hintsNumber == 0) {
            setSummary({ message: messages.noHintSummary, values: {} });
        } else {
            setSummary({ message: messages.hintSummary, values: { hint: hints[0].value, count: (hintsNumber - 1) } });
        }
    }, [hints]);

    const handleAdd = () => {
        let newId = 0
        if (!_.isEmpty(hints)){
            newId = Math.max(...hints.map(hint => hint.id)) + 1
        }
        const hint = { id: newId, value: "" }
        hints = [...hints, hint]
        updateSettings({ hints });
    }


    return {
        summary,
        handleAdd,
    }
}

export const hintsRowHooks = (id, hints, updateSettings) => {

    const handleChange = (event) => {
        const value = event.target.value
        hints = hints.map(hint => {
            if (hint.id === id) {
                return { ...hint, value };
            }
            return hint;
        });
        updateSettings({ hints });
    }

    const handleDelete = () => {
        hints = hints.filter((hint) => (hint.id != id));
        updateSettings({ hints });
    }

    return {
        handleChange,
        handleDelete,
    }
}

export const matlabCardHooks = (matLabApiKey, updateSettings) => {
    const [summary, setSummary] = module.state.summary({ message: "", values: {}, intl: false })

    useEffect(() => {
        if (_.isEmpty(matLabApiKey)) {
            setSummary({ message: messages.matlabNoKeySummary, values: {}, intl: true });
        } else {
            setSummary({ message: matLabApiKey, values: {}, intl: false });
        }
    }, [matLabApiKey])

    const handleChange = (event) => {
        updateSettings({ matLabApiKey: event.target.value });
    }

    return {
        summary,
        handleChange,
    }
}

export const randomizationCardHooks = (dispatch) => ({
    handleChange: (event) => {
        dispatch(actions.problem.updateSettings({ randomization: event.target.value }));
    }
})

export const resetCardHooks = (updateSettings) => {

    const setReset = (value) => {
        updateSettings({ showResetButton: value });
    }

    return {
        setResetTrue: () => setReset(true),
        setResetFalse: () => setReset(false),
    }
}

export const scoringCardHooks = (scoring, updateSettings) => {

    const handleMaxAttemptChange = (event) => {
        let unlimitedAttempts = true;
        let attemptNumber = parseInt(event.target.value);
        if(_.isNaN(attemptNumber)) {
            attemptNumber = 0;
        }
        if (attemptNumber > 0) {
            unlimitedAttempts = false;
        }
        updateSettings({ scoring: { ...scoring, attempts: { number: attemptNumber, unlimited: unlimitedAttempts } } });
    }

    const handleWeightChange = (event) => {
        let weight = parseFloat(event.target.value)
        if(_.isNaN(weight)) {
            weight = 0;
        }
        updateSettings({ scoring: { ...scoring, weight: weight } });
    }

    return {
        handleMaxAttemptChange,
        handleWeightChange,
    }
}

export const showAnswerCardHooks = (showAnswer, updateSettings) => {

    const handleShowAnswerChange = (event) => {
        updateSettings({ showAnswer: { ...showAnswer, on: event.target.value } });
    }

    const handleAttemptsChange = (event) => {
        let attempts = parseInt(event.target.value)
        if(_.isNaN(attempts)){
            attempts = 0;
        }
        updateSettings({ showAnswer: { ...showAnswer, afterAttempts: attempts } });
    }

    return {
        handleShowAnswerChange,
        handleAttemptsChange,
    }
}

export const timerCardHooks = (updateSettings) => ({

    handleChange: (event) => {
        let time = parseInt(event.target.value);
        if(_.isNaN(time)){
            time = 0;
        }
        updateSettings({ timeBetween: time });
    }
})

export const typeRowHooks = (typeKey, updateField) => {

    const onClick = () => {
        updateField({ problemType: typeKey });
    }

    return {
        onClick,
    }
}
