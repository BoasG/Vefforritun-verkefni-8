const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
    items.querySelectorAll('.item__checkbox').forEach(element => {
      element.addEventListener('click', finish);
    });
    items.querySelectorAll('.item__text').forEach(element => {
      element.addEventListener('click', edit);
    });
    items.querySelectorAll('.item__button').forEach(element => {
      element.addEventListener('click', deleteItem);
    });
  }

  function formHandler(e) {
    e.preventDefault();
    add();
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    if(e.target.checked){
      e.target.parentNode.className = 'item item--done';
    } else {
      e.target.parentNode.className = 'item';
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const text = e.target.innerText;
    let itemEdit = el('input', 'item__edit', null);
    e.target.replaceWith(itemEdit);
    itemEdit.value = text;
    itemEdit.addEventListener('keypress', commit);
    itemEdit.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if (e.keyCode === ENTER_KEYCODE) {
      const text = e.target.value;
      let itemText = el('span', 'item__text', edit)
      e.target.replaceWith(itemText);
      itemText.innerText = text;
    }

  }

  // fall sem sér um að bæta við nýju item
  function add() {
    const formInput = document.querySelector('.form__input')
    if(/\S/.test(formInput.value))
    {
      const li = document.createElement('li');
      li.className = 'item';
      li.appendChild(el('input', 'item__checkbox', finish));
      li.appendChild(el('span', 'item__text', edit));
      li.appendChild(el('button', 'item__button', deleteItem));
      items.append(li);
      formInput.value = '';
    }

  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const item = e.target.parentNode;
    item.parentNode.removeChild(item);

  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    if(className === 'item__checkbox') {
      element.type = 'checkbox';
    }
    if(className === 'item__text') {
      const formInput = document.querySelector('.form__input');
      element.append(document.createTextNode(formInput.value));
    }
    if(className === 'item__button') {
      element.append(document.createTextNode('Eyða'));
    }
    element.className = className;
    if(clickHandler != null)
    {
      element.addEventListener('click', clickHandler);
    }
    return element;
  }

  return {
    init: init
  }

})();
