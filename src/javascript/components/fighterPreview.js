import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)
  if(fighter)
  {
    const image = createFighterImage(fighter);
    const info = createFighterInfo(fighter);
    fighterElement.append(image, info);
  }

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

export function createFighterInfo(fighter) {

  const name = fighter.name;
  const health = fighter.health;
  const attack = fighter.attack;
  const defense = fighter.defence;

  const fighterInfoElement = createElement({
    tagName: 'div',
    className: 'fighter-preview___info'
  });

  fighterInfoElement.innerHTML = `
    <span><b>${name}</b></span><br>
    <span>Health: ${health}HP</span></br>
    <span>Attack: ${attack}</span></br>
    <span>Defence: ${defense}</span></br>
  `;

  return fighterInfoElement;
}
