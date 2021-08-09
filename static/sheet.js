
function updateRow(elem)
{
    let clicked = elem.previousSibling.previousSibling;
    var inputs = Array.prototype.slice.call(
        document.getElementsByName(clicked.name));
    let index = inputs.indexOf(clicked);

    if (clicked.checked)
    {        
        clicked.checked = false;
        clicked.parentNode.classList.remove('vtm-static-filled');

        inputs[index - 1].checked = true;
    }
    else
    {
        for (i of inputs)
        {
            if (parseInt(i.value) < index)
            {
                i.parentNode.classList.add('vtm-static-filled');
                i.checked = false;
            }
            else if (parseInt(i.value) === index)
            {
                i.parentNode.classList.add('vtm-static-filled');
                i.checked = true;
            }
            else
            {
                i.parentNode.classList.remove('vtm-static-filled');
                i.checked = false;
            }
        }
    }  
}

function addDynamicField(templateName, id, name, value=null, readOnly=true)
{
    field = document.getElementById(id);
    if (field)
    {
        // Field already exists remove it instead
        field.remove();
        return;
    }
    var template = document.getElementById(templateName);
    let parent = template.parentNode;
    var clone = template.content.cloneNode(true);

    clone.querySelectorAll('.template').forEach(input =>
        {
            input.name = id;
            if (value) { input.value = value; input.readOnly = readOnly; }
        });
    clone.querySelector('#template-id').id = id;
    nameInput = clone.querySelector('#template-name');
    nameInput.value = name;
    nameInput.readOnly = readOnly;
    parent.insertBefore(clone, template);
}

function changeMorality(id, label, bearing, virtues)
{
    inputs = document.getElementsByClassName("morality-input")

    for (input of inputs)
    {
        input.name = id;
    }
    document.getElementById("moralityLabel").value = label;
    document.getElementById("bearingName").value = bearing;
    document.getElementById("conscienceLabel").innerHTML = virtues[0];
    document.getElementById("selfControlLabel").innerHTML = virtues[1];
}

function updateStaticField(inputID, value)
{
    document.getElementById(inputID).value = value;
}

function updateClan(clan, weakness)
{
    document.getElementById("clanID").value = clan;

    if (!weakness) document.getElementById("weaknessInput").readOnly = false;
    else
    {
        input = document.getElementById("weaknessInput")
        input.value = weakness;
        input.readOnly = true;
    }
    
}