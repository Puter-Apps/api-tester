let startTime;

// Tab switching functionality
function switchTab(tabName) {
    // Remove active class from all tabs and tab contents
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

// Add new header row
function addHeader() {
    const container = document.getElementById('headersContainer');
    const headerRow = document.createElement('div');
    headerRow.className = 'header-row';
    headerRow.innerHTML = `
        <input type="text" class="header-input" placeholder="Header Name" data-type="key">
        <input type="text" class="header-input" placeholder="Header Value" data-type="value">
        <button class="remove-header-btn" onclick="removeHeader(this)">Remove</button>
    `;
    container.appendChild(headerRow);
}

// Remove header row
function removeHeader(button) {
    button.parentElement.remove();
}

// Collect headers from the form
function collectHeaders() {
    const headers = {};
    const headerRows = document.querySelectorAll('.header-row');
    
    headerRows.forEach(row => {
        const keyInput = row.querySelector('[data-type="key"]');
        const valueInput = row.querySelector('[data-type="value"]');
        
        if (keyInput.value.trim() && valueInput.value.trim()) {
            headers[keyInput.value.trim()] = valueInput.value.trim();
        }
    });
    
    return headers;
}

// Format JSON with syntax highlighting
function formatJson(obj) {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
            let cls = 'json-number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'json-key';
                } else {
                    cls = 'json-string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'json-boolean';
            } else if (/null/.test(match)) {
                cls = 'json-null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        }
    );
}

// Get status class for styling
function getStatusClass(status) {
    if (status >= 200 && status < 300) return 'status-200';
    if (status >= 400 && status < 500) return 'status-400';
    if (status >= 500) return 'status-500';
    return 'status-default';
}

// Main send request function
async function sendRequest() {
    const method = document.getElementById('methodSelect').value;
    const url = document.getElementById('urlInput').value.trim();
    const body = document.getElementById('requestBody').value.trim();
    const sendBtn = document.getElementById('sendBtn');
    const responseBody = document.getElementById('responseBody');
    const responseStatus = document.getElementById('responseStatus');
    const responseTime = document.getElementById('responseTime');

    // Validation
    if (!url) {
        alert('Please enter a URL');
        return;
    }

    // Disable send button and show loading
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    responseBody.innerHTML = '<div class="loading"><div class="spinner"></div>Sending request...</div>';
    responseStatus.textContent = '';
    responseTime.textContent = '';

    try {
        // Prepare request options
        const options = {
            method: method,
            headers: collectHeaders()
        };

        // Add body for methods that support it
        if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
            options.body = body;
            // Set default content-type if not specified
            if (!options.headers['Content-Type'] && !options.headers['content-type']) {
                try {
                    JSON.parse(body);
                    options.headers['Content-Type'] = 'application/json';
                } catch (e) {
                    options.headers['Content-Type'] = 'text/plain';
                }
            }
        }

        // Record start time
        startTime = Date.now();

        // Make the request using Puter's fetch API
        const response = await puter.net.fetch(url, options);
        
        // Calculate response time
        const responseTimeMs = Date.now() - startTime;
        responseTime.textContent = `${responseTimeMs}ms`;

        // Update status
        responseStatus.textContent = `${response.status} ${response.statusText}`;
        responseStatus.className = `response-status ${getStatusClass(response.status)}`;

        // Get response text
        const responseText = await response.text();
        
        // Try to parse as JSON for pretty formatting
        try {
            const jsonData = JSON.parse(responseText);
            responseBody.innerHTML = `<div class="json-pretty">${formatJson(jsonData)}</div>`;
        } catch (e) {
            // Not JSON, display as plain text
            responseBody.textContent = responseText || 'No response body';
        }

    } catch (error) {
        // Handle errors
        const responseTimeMs = Date.now() - startTime;
        responseTime.textContent = `${responseTimeMs}ms`;
        responseStatus.textContent = 'Error';
        responseStatus.className = 'response-status status-400';
        
        responseBody.innerHTML = `
            <div class="error">
                <strong>Error:</strong> ${error.message}
            </div>
        `;
    } finally {
        // Re-enable send button
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send Request';
    }
}

// Event listeners
document.getElementById('sendBtn').addEventListener('click', sendRequest);

// Allow Enter key to send request when URL input is focused
document.getElementById('urlInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendRequest();
    }
});

// Add some default headers
document.addEventListener('DOMContentLoaded', function() {
    // Add a default Accept header
    const firstKeyInput = document.querySelector('[data-type="key"]');
    const firstValueInput = document.querySelector('[data-type="value"]');
    firstKeyInput.value = 'Accept';
    firstValueInput.value = 'application/json';
});
