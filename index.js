const container = document.getElementById('container');
const inputButton = document.getElementById('saveButton');

const url = 'http://likeliontoyproj.kro.kr:8000/'

function getData() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${url}/list/`); 
            console.log(response);
            
            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}

function handleDelete(guestbookID){
    var result = confirm("삭제하시겠습니까?");

    
    axios.delete(`${url}/delete/${guestbookID}/`)
    .then(function(response){
        console.log('DELETE 요청 성공');
        location.reload();
        
    })
    .catch(function(error){
        // console.log(`${url}/delete/{${id}}/`);
        console.log("id는"+guestbookID);
        console.error('DELETE 요청 실패', error);
    });

}

getData()
    .then((response) => {
        console.log(response.data.result);
        {response.data.result.map((datas, i)=>{
            const guestBook = document.createElement('div');
            guestBook.id = 'guestBook';

            const name = document.createElement('div');
            name.id='name';
            name.innerText=`${datas.name}`;

            const message = document.createElement('div');
            message.id='message';
            message.innerText=`${datas.message}`;

            const deleteButton = document.createElement('button');
            deleteButton.id = 'delete';
            let guestBookID = 0;
            guestBookID = datas.id;
            console.log(datas.id);
            console.log(guestBookID);
            deleteButton.addEventListener('click', function(){
                console.log(name);
                console.log(message);
                handleDelete(guestBookID);
            })
            deleteButton.innerText='X';

            // const created_at = document.createElement('div');
            // created_at.id = 'createdAt';
            // created_at.innerText=`${datas.created_at}`

            container.appendChild(guestBook);
            guestBook.appendChild(name);
            guestBook.appendChild(message);
            // guestBook.appendChild(created_at);
            container.appendChild(deleteButton);

            inputButton.onclick= function(){
                var nameInput = document.getElementById('nameBox').value;
                console.log(nameInput);
                var messageInput = document.getElementById('inputBox').value;
                console.log(messageInput);

                var data = JSON.stringify({
                    "name" : nameInput,
                    "message" : messageInput
                });

                axios.post(`${url}/create/`, data)
                    .then(function(response){
                        console.log("POST 요청 성공 전송");
                        location.reload();
                        
                    })
                    .catch(function(error){
                        console.error("POST 요청 실패", error);
                    });
            }

        })

        }

    })
    .catch((error) => { 
    
    });