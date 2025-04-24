"use client"

import type React from "react"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PlusCircle, GripVertical, Trash2 } from "lucide-react"
import type { Link } from "@/types/database"
import { createLink, deleteLink, updateLink, updateLinkOrder } from "@/app/actions/link-actions"

type LinkListProps = {
  initialLinks?: Link[]
  userId: string
}

export function LinkList({ initialLinks = [], userId }: LinkListProps) {
  const [links, setLinks] = useState<Link[]>(initialLinks)
  const [newLinkTitle, setNewLinkTitle] = useState("")
  const [newLinkUrl, setNewLinkUrl] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLinkTitle || !newLinkUrl) return

    setIsSubmitting(true)
    try {
      const newLink = await createLink({
        user_id: userId,
        title: newLinkTitle,
        url: newLinkUrl.startsWith("http") ? newLinkUrl : `https://${newLinkUrl}`,
        is_active: true,
      })

      setLinks([...links, newLink])
      setNewLinkTitle("")
      setNewLinkUrl("")
      setIsAdding(false)
    } catch (error) {
      console.error("Error adding link:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteLink = async (id: string) => {
    try {
      await deleteLink(id)
      setLinks(links.filter((link) => link.id !== id))
    } catch (error) {
      console.error("Error deleting link:", error)
    }
  }

  const handleUpdateLink = async (id: string, data: Partial<Link>) => {
    try {
      const updatedLink = await updateLink(id, data)
      setLinks(links.map((link) => (link.id === id ? updatedLink : link)))
    } catch (error) {
      console.error("Error updating link:", error)
    }
  }

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(links)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update positions
    const updatedItems = items.map((item, index) => ({
      ...item,
      position: index,
    }))

    setLinks(updatedItems)

    // Update in database
    try {
      await updateLinkOrder(
        updatedItems.map((item) => ({
          id: item.id,
          position: item.position || 0,
        })),
      )
    } catch (error) {
      console.error("Error updating link order:", error)
    }
  }

  return (
    <div className="space-y-4">
      {links.length === 0 && !isAdding ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">You don't have any links yet</p>
          <Button onClick={() => setIsAdding(true)}>Add Your First Link</Button>
        </div>
      ) : (
        <>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="links">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {links.map((link, index) => (
                    <Draggable key={link.id} draggableId={link.id} index={index}>
                      {(provided) => (
                        <Card ref={provided.innerRef} {...provided.draggableProps} className="relative group">
                          <CardContent className="p-3 flex items-center gap-3">
                            <div {...provided.dragHandleProps} className="cursor-move text-muted-foreground">
                              <GripVertical size={20} />
                            </div>
                            <div className="flex-1">
                              <Input
                                value={link.title}
                                onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                                className="mb-1"
                              />
                              <Input
                                value={link.url}
                                onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteLink(link.id)}
                              className="text-destructive"
                            >
                              <Trash2 size={18} />
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {isAdding ? (
            <Card>
              <CardContent className="p-3">
                <form onSubmit={handleAddLink} className="space-y-2">
                  <Input
                    placeholder="Link Title"
                    value={newLinkTitle}
                    onChange={(e) => setNewLinkTitle(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="URL (e.g. https://example.com)"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    required
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button type="button" variant="outline" onClick={() => setIsAdding(false)} disabled={isSubmitting}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Adding..." : "Add Link"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Button onClick={() => setIsAdding(true)} variant="outline" className="w-full">
              <PlusCircle size={18} className="mr-2" />
              Add New Link
            </Button>
          )}
        </>
      )}
    </div>
  )
}
