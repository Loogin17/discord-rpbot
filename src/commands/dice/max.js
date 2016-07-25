'use babel';
'use strict';

import DiceExpression from 'dice-expression-evaluator';
import logger from '../../util/logger';

export default {
	name: 'maxroll',
	description: 'Calculates the maximum possible roll for a dice expression.',
	usage: '!maxroll <dice expression>',
	details: 'The dice expression follows the same rules as !roll, but targets (< or >) cannot be used.',
	examples: ['!maxroll 2d20', '!maxroll 3d20 - d10 + 6'],

	triggers: [
		/^!maxroll\s+(.+?)\s*$/i
	],

	isRunnable() {
		return true;
	},

	run(message, matches) {
		try {
			const maxRoll = new DiceExpression(matches[1]).max();
			message.client.reply(message, `The maximum possible roll is **${maxRoll}**.`);
		} catch(e) {
			logger.error(e);
			message.client.reply(message, 'Invalid dice expression specified.');
			return;
		}
	}
};