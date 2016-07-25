'use babel';
'use strict';

import DiceExpression from 'dice-expression-evaluator';
import logger from '../../util/logger';

export default {
	name: 'minroll',
	description: 'Calculates the minimum possible roll for a dice expression.',
	usage: '!minroll <dice expression>',
	details: 'The dice expression follows the same rules as !roll, but targets (< or >) cannot be used.',
	examples: ['!minroll 2d20', '!minroll 3d20 - d10 + 6'],

	triggers: [
		/^!minroll\s+(.+?)\s*$/i
	],

	isRunnable() {
		return true;
	},

	run(message, matches) {
		try {
			const minRoll = new DiceExpression(matches[1]).min();
			message.client.reply(message, `The minimum possible roll is **${minRoll}**.`);
		} catch(e) {
			logger.error(e);
			message.client.reply(message, 'Invalid dice expression specified.');
			return;
		}
	}
};