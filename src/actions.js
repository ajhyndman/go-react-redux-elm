import constants from './utils/constants';


const Actions = {
    placeStone: (color) => ({
        type: constants.actionTypes.PLACE_STONE,
        color: color,
    }),
    pass: {
        type: constants.actionTypes.PASS,
    },
};


export default Actions;
