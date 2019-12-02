import React, { Component } from 'react';
class Print extends Component {
    printIframe = (id) => {
        // const iframe = document.frames ? document.frames[id] : document.getElementById(id);
        // const iframeWindow = iframe.contentWindow || iframe;

        // iframe.focus();
        // iframeWindow.print();
        let my_window = window.open('', 'mywindow', 'status=1,width=350,height=150');
        my_window.document.write('<html><head><title>Print Me</title></head>');
        my_window.document.write('<body onafterprint="self.close()">');
        my_window.document.write(document.getElementById(id).innerHTML);
        my_window.document.write('</body></html>');
        my_window.print();
        return false;
    };
    componentDidMount() {
        this.printIframe("receipt")
    }
    render() {
        return (
            <>
                <iframe id="receipt" style={{ display: 'none' }} title="Receipt">
                    {this.props.children}
                </iframe>
            </>
        );
    }
}


export default Print;