/**
 * @author James LaBroy
 */

"use strict"

var Node = function(data) {
	this.data = data;
	this.left = null;
	this.right = null;
}

var Organisation = function() {
	Organisation.prototype.lca = function(root, a, b) {
		if (root == null) return null;
		
		if (root.data == a || root.data == b) return root;
		
		var l = null, r = null;
		
		if (root.left != null) 	l = this.lca(root.left, a, b);
		if (root.right != null) r = this.lca(root.right, a, b);
		
		if (l != null && r !== null) return root;
		if (l != null) return l;
		return r;	
	};
	
	Organisation.prototype.findInTree = function(root, employee) {
		if (root == null) return false;
	
		if (root.data != employee) {
			if (root.left != null) 	root = this.findInTree(root.left, employee);
			if (root.right != null) root = this.findInTree(root.right, employee);
		}
		
		return root;
	};
	
	Organisation.prototype.findEmployeesManager = function(employees) {
		var employee1 = employees.shift();
		var employee2 = employees.shift();
		
		var tree = null;
		
		for (var i in employees) {
			var employee = employees[i].split(" ");
			
			if (tree == null) tree = new Node(employee[0]);
			
			var manager = this.findInTree(tree, employee[0]);
			if (manager.left == null) {
				manager.left = new Node(employee[1]);
			} else {
				manager.right = new Node(employee[1]);
			}
		}
		
		return this.lca(tree, employee1, employee2);
	}
};

var employees = [
	"Hilary",
	"James",
	"Sarah Fred",
	"Sarah Paul",
	"Fred Jenny",
	"Jenny James",
	"Fred Hilary"
];

var organisation = new Organisation();
var manager = organisation.findEmployeesManager(employees);
console.log(manager);
