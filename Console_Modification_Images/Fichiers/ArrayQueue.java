/*
 * According to: Travaux Pratiques dans le cous INF2010 coordonnés par Tarek OULD-BACHIR
 *
 * @authors Allan BEDDOUK & Simon GÉRIN_ROZE
 * @created: 2018-08-27
 */

public class ArrayQueue<AnyType> implements Queue<AnyType>
{
	private int size = 0;		//Nombre d'elements dans la file.
	private int startindex = 0;	//Index du premier element de la file
	private AnyType[] table;
   
	@SuppressWarnings("unchecked")
	public ArrayQueue() 
	{
		table = (AnyType[]) new Object[1];
	}
	
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
	//complexit� asymptotique: O(1)
	public AnyType peek()
	{
		return size == 0 ? null : table[startindex];
	}
	
	//Retire l'element en tete de file
	//complexit� asymptotique: O(1)
	public void pop() throws EmptyQueueException
	{
		if(size == 0) throw new EmptyQueueException();
		
		table[startindex] = null;
		size--;
		startindex++;
		
	}
	
	//Ajoute un element a la fin de la file
	//Double la taille de la file si necessaire (utiliser la fonction resize definie plus bas)
	//complexit� asymptotique: O(1) ( O(N) lorsqu'un redimensionnement est necessaire )
	public void push(AnyType item)
	{
		if(startindex + size == table.length) resize(2);
		
		table[startindex + size] = item;
		++size;
	}
   
	//Redimensionne la file. La capacite est multipliee par un facteur de resizeFactor.
	//Replace les elements de la file au debut du tableau
	//complexit� asymptotique: O(N)
	@SuppressWarnings("unchecked")
	private void resize(int resizeFactor)
	{
		AnyType[] tableTemp = (AnyType[]) new Object[resizeFactor * table.length];
		
		for(int i = startindex; i < startindex + size; ++i)
			tableTemp[i] = table[i];
		
		table = tableTemp;
	}   
}

