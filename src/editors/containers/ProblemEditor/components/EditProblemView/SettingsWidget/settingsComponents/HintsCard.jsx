import React from 'react'
import { useDispatch } from 'react-redux';
import { injectIntl, FormattedMessage, intlShape } from '@edx/frontend-platform/i18n';
import SettingsOption from '../SettingsOption';
import { Button } from '@edx/paragon'
import { Add } from '@edx/paragon/icons';
import messages from '../messages';
import { hintsCardHooks, hintsRowHooks } from '../hooks';
import HintRow from './HintRow';

export const HintsCard = ({
    hints,
    intl,
}) => {
    const dispatch = useDispatch();
    const { summary, handleAdd } = hintsCardHooks(hints, dispatch);

    return (
        <SettingsOption
            title={intl.formatMessage(messages.hintSettingTitle)}
            summary={intl.formatMessage(summary.message, {...summary.values})}
        >
            {hints.map((hint) => (
                <HintRow
                    key={hint.id}
                    id={hint.id}
                    value={hint.value}
                    {...hintsRowHooks(hint.id, hints, dispatch)}
                />
            ))}
            <Button
                className="my-3 ml-2"
                iconBefore={Add}
                variant="tertiary"
                onClick={handleAdd}
            >
                <FormattedMessage {...messages.addHintButtonText} />
            </Button>
        </SettingsOption>
    )
}

HintsCard.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(HintsCard);