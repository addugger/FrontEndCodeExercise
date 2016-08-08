/**
 * Contains simple MVC setup for Task Tracker
 */

	
$("body").ready(function()
{
	$(function() {
		
		var model =
		{
			/**
			 * Contains all tasks (initially just the initial set)
			 */
			tasks: [
			        {"name": "Test Task #1", "date": "12/01/2012", "assigned": "John Doe" },
			    	{"name": "Test Task #2", "date": "12/02/2012", "assigned": "John Doe" },
			    	{"name": "Test Task #3", "date": "12/03/2012", "assigned": "John Doe" },
			    	{"name": "Test Task #4", "date": "12/04/2012", "assigned": "John Doe" },
			    	{"name": "Test Task #5", "date": "12/05/2012", "assigned": "John Doe" },
			    	{"name": "Test Task #6", "date": "12/06/2012", "assigned": "John Doe" },
			    	{"name": "Test Task #7", "date": "12/07/2012", "assigned": "John Doe" }
			    	],
			init: function()
			{
				var tasks = ctrl.getTasks();
			}
		};
		
		var ctrl =
		{
			getTasks: function()
			{
				return model.tasks;
			},
			/**
			 * Add new task from form to task table
			 */
			addNewTask: function()
			{
				var name = $(".task-name").val();
				var date = $(".task-date").val();
				var asn = $(".task-assigned").val();
				if (name !== null && name !== ""
					&& date !== null && date !== ""
					&& asn !== null && asn !== "")
				{
					//NOTE: I originally had a Task class defined in model and created a new task object and added that, but
					//changed it to this because the requirements stated that I should just use straight JSON. Taking
					//that even further, I didn't know if that meant I was supposed to write out a JSON string, and then
					//parse it into a JavaScript object later. I decided that didn't make sense, but I figured I would note
					//it here in case that was the intent. In that case I would have written it out as a string version of the
					//object, and then used jQuery's parseJSON to parse it into an object when rendering the table view.
					var task = {"name": name, "date": date, "assigned": asn};
					model.tasks.unshift(task);
					tableView.render();
				}
				else {
					alert("You must give a name, date, and assigned to!!!!! Please try again!");
				}
			},
			init: function()
			{
				model.init();
				tableView.init();
				formView.init();
			}
		};
		
		var tableView =
		{
			init: function()
			{
				tableView.render();
			},
			render: function()
			{
				var tbl = $(".task-table");
				tbl.empty();
				var tasks = ctrl.getTasks();
				for (var i in tasks)
				{
					var row = "<tr>";
					row += "<td class=\"name-col\">" + tasks[i].name + "</td>";
					row += "<td class=\"date-col\">" + tasks[i].date + "</td>";
					row += "<td class=\"assigned-col\">" + tasks[i].assigned + "</td>";
					row += "</tr>";
					tbl.append(row);
				}
			}
		};
		
		var formView =
		{
			/**
			 * Empty vals for all the inputs
			 */
			reset: function()
			{
				$(".task-name").val("");
				$(".task-date").val("");
				$(".task-assigned").val("");
			},
			init: function()
			{
				$(".task-submit").click(
					function()
					{
						ctrl.addNewTask();
						formView.reset();
					}
				);
			}
		};
		
		ctrl.init();
	});
});