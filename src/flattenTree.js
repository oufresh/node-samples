var root = 'root';

var flatTree = new Map();

flatTree.set('root', { id:'root', children:['second', 'third']});
flatTree.set('second', {id:'second', children:['ciccio'], parent: 'root'});
flatTree.set('ciccio', {id:'ciccio', children:['baba', 'caca'], parent: 'second'});
flatTree.set('caca', {id:'caca', parent: 'ciccio'});
flatTree.set('baba', {id:'baba', parent: 'ciccio'});
flatTree.set('third', {id:'third', parent: 'root'});

function renderChild(title, depth)
{
    var str = '';
    
    while (depth--)
        str += ' ';
    
    str += title;

    console.log(str);
}

function renderNode(title, depth)
{
    var str = '';
    
    while (depth--)
        str += ' ';
    
    str += title + ' ->';

    console.log(str);
}

function renderTree(node, depth)
{
    if (node.children)
    {
        //disegno il nodo con la depth sua di pertinenza
        renderNode(node.id, depth);

        //aumento dopo la depth per disegnare eventuali sottonodi con la depth aumentata
        depth++;
        node.children.map((childNodeId) => {
            let childNode = flatTree.get(childNodeId);
            renderTree(childNode, depth);
        });
    }
    else
    {
        renderChild(node.id, depth);
    }
}

function render()
{
    var root = flatTree.get('root');
    renderTree(root, 0);
}

module.exports = {
    render: render
};