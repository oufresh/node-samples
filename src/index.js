//Example tree
var flattenTree = require('./flattenTree.js');

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
    if (node.childNodes)
    {
        //disegno il nodo con la depth sua di pertinenza
        renderNode(node.title, depth);

        //aumento dopo la depth per disegnare eventuali sottonodi con la depth aumentata
        depth++;
        node.childNodes.map((childNode) => {
            renderTree(childNode, depth);
        });
    }
    else
    {
        renderChild(node.title, depth);
    }
}

var tree = {
    title: "howdy",
    childNodes: [
      {title: "bobby"},
      {title: "suzie", childNodes: [
        {title: "puppy", childNodes: [
          {title: "dog house"}
        ]},
        {title: "cherry tree"}
      ]}
    ]
};

console.log('Hello tree');
//renderTree(tree, 0);
flattenTree.render();
