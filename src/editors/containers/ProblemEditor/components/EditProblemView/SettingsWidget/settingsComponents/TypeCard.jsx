import React from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import SettingsOption from '../SettingsOption';
import { ProblemTypeKeys, ProblemTypes } from '../../../../../../data/constants/problem';
import messages from '../messages';
import TypeRow from './TypeRow';


export const TypeCard = ({
    problemType,
    updateField,
    //inject
    intl,
}) => {

    const problemTypeKeysArray = Object.values(ProblemTypeKeys);

    return (
        <SettingsOption
            title={intl.formatMessage(messages.typeSettingTitle)}
            summary={ProblemTypes[problemType].title}
        >
            {problemTypeKeysArray.map((typeKey, i) => (
                <TypeRow
                    key={i}
                    typeKey={typeKey}
                    label={ProblemTypes[typeKey].title}
                    selected={typeKey !== problemType}
                    lastRow={(i + 1) == problemTypeKeysArray.length}
                    updateField={updateField}
                />
            ))}
        </SettingsOption>
    )
}

TypeCard.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(TypeCard);
