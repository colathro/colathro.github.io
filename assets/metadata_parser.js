class Parser {

    // Start Constructor
    constructor (input, output, button){
        this.input = input;
        this.output = output;
        this.button = button;
        this.parse_metadata();
        this.add_listeners();
    }

    add_listeners () {
        document.getElementById(this.button).addEventListener('click' ,this.start_parse.bind(this));
    }
    // End Constructor

    // Start Metadata Code
    parse_metadata () {
        var getJson = $.getJSON('/assets/metadata.json', this.set_metadata.bind(this));
    }

    set_metadata (data) {
        this.metadata = data;
    }
    // End Metadata Code

    // Start Parser Logic
    start_parse () {
        var columns = document.getElementById(this.input).value.split('\n')
        var lower_columns = this.convert_lower(columns);
        var sorted_columns = lower_columns.sort();
        
        var x = this.find_table(sorted_columns);
        
        document.getElementById(this.output).value = this.top_10(x);
        
    }

    find_table (columns) {
        var output = [];
        this.metadata.forEach(element => {
            var target = this.convert_lower(element[1])
            var num_match = 0;

            for (let index = 0; index < target.length; index++) {
                if (columns.includes(target[index])){
                    num_match += 1;
                }
            }
            output.push([element[0], num_match/columns.length])
        });
        var sorted_output = output.sort(sortFunction);
        return sorted_output;
    }

    convert_lower (columns) {
        var output = [];
        
        columns.forEach(element => {
            output.push(element.toLowerCase());
        });
        return output
    }

    top_10 (output) {
        var final_write = "";
        for (let index = 0; index < 10; index++) {
            var temp = output[index][0] + "| Match: " + Math.floor(output[index][1] * 100) + "%\n"
            final_write += temp;
        }
        return final_write;
    }

    // End Parser Logic

}

function sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}

parser = new Parser('input_box', 'output_box', 'submit');
