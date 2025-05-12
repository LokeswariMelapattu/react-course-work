import { players } from '../mocks/players';
import { addPlayer, removePlayer, togglePlayerStatus } from '../store/actionCreators';
import * as actions from '../store/actionTypes';

describe('addPlayer', () => {
  it('should return object with correct type and payload', () => {
    const { name, isActive } = players[0];
    const action = addPlayer({ name, isActive });
    expect(action).toMatchObject({
      type: actions.ADD_PLAYER,
      payload: { name, isActive }
    });
  });
});

describe('removePlayer', () => {
  it('should return object with correct type and payload', () => {
    const { id } = players[0];
    const action = removePlayer(id);
    expect(action).toMatchObject({
      type: actions.REMOVE_PLAYER,
      payload: {
        id
      }
    });
  });
});

describe('togglePlayerStatus', () => {
  it('should return object with correct type and payload', () => {
    const { id } = players[0];
    const action = togglePlayerStatus(id);
    expect(action).toMatchObject({
      type: actions.TOGGLE_PLAYER_STATUS,
      payload: {
        id
      }
    });
  });
});
