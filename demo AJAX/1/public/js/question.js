const bindButtonClick = () => {
    $('button[name="answer"]').on('click', (event) => {
      event.preventDefault();
      
      $('button[name="answer"]').attr("disabled", "disabled");
      const answer = $(event.target).closest("button").attr("value");
      $.ajax({
        url: '/api/question/' + $('#answer_form').attr("data-question-id"),
        method: 'post',
        data: { answer }
      })
      .done((resultHtml) => {
        $('#result').html(resultHtml);
      })
      .fail((err) => {
        console.error(err);
      })
      .always(() => {
        $('button[name="answer"]').removeAttr("disabled");
      });
    });
  }
  
  bindButtonClick();