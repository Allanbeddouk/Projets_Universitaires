/**
 * Classe de Liste liées
 * @author : Allan BEDDOUK, Simon Gérin-Roze
 * @date : 01/10/2018
 */
public class LinkedListQueue<AnyType> implements Queue<AnyType>
{	
	// Un noeud de la file
	@SuppressWarnings("hiding")
	private class Node<AnyType> 
	{
		private AnyType data;
		private Node next;
		
		public Node(AnyType data, Node next) 
		{
			this.data = data;
			this.next = next;
		}

		public void setNext(Node next) 
		{
			this.next = next;
		}
		
		public Node<AnyType> getNext() 
		{
			return next;
		}
		
		public AnyType getData() 
		{
			return data;
		}
	}
   
	private int size = 0;		//Nombre d'elements dans la file.
	private Node<AnyType> last = null;	//Dernier element de la liste
	
	//Indique si la file est vide
	public boolean empty() 
	{ 
		return size == 0; 
	}
	
	//Retourne la taille de la file
	public int size() 
	{ 
		return size; 
	}
	
	//Retourne l'element en tete de file
	//Retourne null si la file est vide
	//complexite asymptotique: O(1)
	public AnyType peek()
	{
		return (empty() ? null : last.getNext().getData());
	}
	
	//Retire l'element en tete de file
	//complexite asymptotique: O(1)
	public void pop() throws EmptyQueueException
	{
		if(empty())
			throw new EmptyQueueException();
		else if(size == 1)
			last = null;
		else
			last.setNext(last.getNext().getNext());
		
		--size;
	}
	
	//Ajoute un element a la fin de la file
	//complexite asymptotique: O(1)
	public void push(AnyType item)
	{
		if(last == null)
		{
			last = new Node(item, null);
			last.setNext(last);
		}
		else
		{
			last.setNext(new Node(item, last.getNext()));
			last = last.getNext();
		}
		
		++size;
	}  
}
