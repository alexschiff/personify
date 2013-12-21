$(document).ready(function() {
	
	$('#submitButtonEmail').click(function() {
		var email = $('#Email').val();
	

	$.fullcontact.emailLookup('fdd4a159a9943b57', email, function(obj) {
		console.log(obj);
		
		if (obj.status == 200) {



		var person = obj

		console.log("Identity found!")
		console.log(person)

		$('#fullNameHeader').text('Found '+person.contactInfo.fullName+' with '+person.likelihood+' likelihood!')
		console.log(person.contactInfo.fullName)

		var srcOfPhoto = person.photos[0].url
		console.log(srcOfPhoto)

		$('#photo').attr("src", srcOfPhoto);
		$('#gender').text('Gender: '+person.demographics.gender);
		$('#location').text('Location: '+person.demographics.locationGeneral)
		$('#website').text('Website: '+person.contactInfo.websites[0].url)

		for (var i = 0; i < person.organizations.length; i++) {
			if (person.organizations[i].current === true) {
				var currentRoleTitle = person.organizations[i].title;
				var currentRoleCompany = person.organizations[i].name;
			}
		}		

		$('#currentJob').text('Current Role: '+currentRoleTitle+" at "+currentRoleCompany)

	
	}
	
		else {
			console.log('Error!')
		}

	});
	});

	$('#submitButtonTwitter').click(function() {
		var twitterHandle = $('#twitterHandle').val();
	

	$.fullcontact.twitterLookup('fdd4a159a9943b57', twitterHandle, function(obj) {
		console.log(obj);
		
		if (obj.status == 200) {



		var person = obj

		console.log("Identity found!")
		console.log(person)

		$('#fullNameHeader').text('Found '+person.contactInfo.fullName+'!')
		console.log(person.contactInfo.fullName)

		var srcOfPhoto = person.photos[0].url
		console.log(srcOfPhoto)

		$('#photo').attr("src", srcOfPhoto);
		$('#gender').text('Gender: '+person.demographics.gender);
		$('#location').text('Location: '+person.demographics.locationGeneral)


		for (var i = 0; i < person.organizations.length; i++) {
			if (person.organizations[i].current === true) {
				var currentRoleTitle = person.organizations[i].title;
				var currentRoleCompany = person.organizations[i].name;
			}
		}

		$('#currentJob').text('Current Role: '+currentRoleTitle+" at "+currentRoleCompany)
		$('#website').text('Website: '+person.contactInfo.websites[0].url)
	
	}
	
		else {
			console.log('Error!')
		}
	});
	});


});
